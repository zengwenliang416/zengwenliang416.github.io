import { useRef, useEffect } from "react";
import { ease } from "../../lib/ease";
import { fit, clamp } from "../../lib/math";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Lusion-style section divider: line scales from left with glow pulse.
 * Scroll-driven via IntersectionObserver + RAF.
 */
export default function SectionDivider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (REDUCED) return;
    const line = lineRef.current;
    const glow = glowRef.current;
    const container = containerRef.current;
    if (!line || !glow || !container) return;

    line.style.transform = "scaleX(0)";
    glow.style.opacity = "0";

    let time = 0;
    let animating = false;
    let raf = 0;
    let prevTs = 0;

    const animate = (ts: number) => {
      const dt = prevTs ? (ts - prevTs) / 1000 : 1 / 60;
      prevTs = ts;
      time = clamp(time + (animating ? dt : -dt), 0, 3);

      const scale = fit(time, 0, 1.0, 0, 1, ease.lusion);
      const glowOpacity = fit(time, 0.3, 0.8, 0, 0.08, ease.lusion);

      line.style.transform = `scaleX(${scale})`;
      glow.style.opacity = String(glowOpacity);

      raf = requestAnimationFrame(animate);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          animating = entry.isIntersecting;
        });
      },
      { rootMargin: "-20% 0px -20% 0px" },
    );
    obs.observe(container);
    raf = requestAnimationFrame(animate);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center px-6 md:px-12 py-2"
    >
      <div
        ref={lineRef}
        className="w-full origin-left"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(255,60,95,0.08) 50%, rgba(255,255,255,0.06) 80%, transparent 100%)",
          willChange: "transform",
        }}
      />
      {!REDUCED && (
        <div
          ref={glowRef}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[60px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(88,86,214,0.04) 0%, transparent 70%)",
            opacity: 0,
            willChange: "opacity",
          }}
        />
      )}
    </div>
  );
}
