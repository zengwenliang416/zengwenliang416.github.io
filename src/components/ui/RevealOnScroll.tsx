import { useRef, useEffect, type CSSProperties, type ReactNode } from "react";
import { ease } from "../../lib/ease";
import { fit, clamp } from "../../lib/math";
import { useSplitTextReveal } from "../../hooks/useSplitTextReveal";

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  clipReveal?: boolean;
}

/**
 * Lusion-style scroll-driven reveal.
 * Bidirectional: animates in when entering viewport, reverses when leaving.
 * Two modes: clipReveal (clip-path inset wipe) or translateY (50px slide up).
 */
export default function RevealOnScroll({
  children,
  delay = 0,
  className = "",
  clipReveal = false,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    if (clipReveal) {
      el.style.clipPath = "inset(100% 0% 0% 0%)";
    } else {
      el.style.transform = "translate3d(0, 50px, 0)";
      el.style.opacity = "0";
    }
    el.style.willChange = "transform, opacity, clip-path";

    let time = 0;
    let animating = false;
    let raf = 0;
    let prevTs = 0;

    const animate = (ts: number) => {
      const dt = prevTs ? (ts - prevTs) / 1000 : 1 / 60;
      prevTs = ts;

      time = clamp(
        time + (animating ? dt : -dt) - (animating && time < delay ? 0 : 0),
        -0.1,
        delay + 2,
      );

      const t = time - delay;

      if (clipReveal) {
        const clip = fit(t, 0, 1.0, 100, 0, ease.lusion);
        el.style.clipPath = `inset(${clip}% 0% 0% 0%)`;
      } else {
        const y = fit(t, 0, 0.9, 50, 0, ease.lusion);
        const opacity = fit(t, 0, 0.5, 0, 1, ease.lusion);
        el.style.transform = `translate3d(0, ${y}px, 0)`;
        el.style.opacity = String(opacity);
      }

      // Stop RAF when fully settled (not visible + time near zero)
      if (!animating && time <= 0.01) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(animate);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          animating = entry.isIntersecting;
          // Restart loop if it was paused
          if (animating && !raf) {
            prevTs = 0;
            raf = requestAnimationFrame(animate);
          }
        });
      },
      { rootMargin: "-10% 0px -10% 0px" },
    );
    obs.observe(el);

    raf = requestAnimationFrame(animate);

    return () => {
      obs.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [delay, clipReveal]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface RevealHeadingProps {
  children: string;
  className?: string;
  style?: CSSProperties;
  as?: "h1" | "h2" | "h3" | "h4";
}

/**
 * Lusion-style heading: word-by-word reveal with 1.7em + 15deg.
 * Scroll-driven bidirectional via useSplitTextReveal.
 */
export function RevealHeading({
  children,
  className = "",
  style,
  as: Tag = "h2",
}: RevealHeadingProps) {
  const ref = useSplitTextReveal();

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={style}
      aria-label={children}
    >
      {children}
    </Tag>
  );
}
