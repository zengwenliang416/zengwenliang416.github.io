import { useRef, useEffect, useCallback } from "react";
import { useRAF } from "../hooks/useRAF";
import { useLocale } from "../i18n/LocaleContext";
import { ease } from "../lib/ease";
import { fit, lerp } from "../lib/math";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const CROSS_POSITIONS = [
  { x: "4%", y: "50%", delay: 0.4 },
  { x: "26%", y: "53%", delay: 0.55 },
  { x: "69%", y: "48%", delay: 0.6 },
  { x: "94%", y: "51%", delay: 0.7 },
];

function LusionCross({
  delay,
  style,
}: {
  delay: number;
  style: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (REDUCED || !ref.current) return;
    const el = ref.current;
    el.style.transform = "scale(0) rotate(0deg)";
    el.style.opacity = "0";

    let time = 0;
    let raf = 0;
    let prevTs = 0;

    const animate = (ts: number) => {
      const dt = prevTs ? (ts - prevTs) / 1000 : 1 / 60;
      prevTs = ts;
      time += dt;

      const t = time - delay;
      const s = fit(t, 0, 0.6, 0, 1, ease.lusion);
      const r = fit(t, 0, 0.6, 0, 180, ease.lusion);
      const o = fit(t, 0, 0.3, 0, 1, ease.lusion);
      el.style.transform = `scale(${s}) rotate(${r}deg)`;
      el.style.opacity = String(o);

      if (s < 0.99) {
        raf = requestAnimationFrame(animate);
      } else {
        el.style.willChange = "auto";
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [delay]);

  return (
    <div
      ref={ref}
      className="absolute select-none pointer-events-none"
      style={{
        fontSize: "14px",
        lineHeight: 1,
        color: "rgba(255,255,255,0.15)",
        willChange: "transform, opacity",
        fontWeight: 300,
        ...style,
      }}
    >
      +
    </div>
  );
}

/**
 * Lusion-style line-by-line hero reveal.
 * Each line slides up from translate3d(0, 120%, 0) with stagger.
 * NOT character-by-character — whole lines move as blocks.
 */
function useLineReveal(lineCount: number) {
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const wrapperRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (REDUCED) return;

    const lines = lineRefs.current.filter(Boolean) as HTMLSpanElement[];
    const wrappers = wrapperRefs.current.filter(Boolean) as HTMLSpanElement[];

    lines.forEach((line) => {
      line.style.display = "block";
      line.style.transform = "translate3d(0, 120%, 0) rotate(5deg)";
      line.style.transformOrigin = "left bottom";
      line.style.willChange = "transform";
    });

    wrappers.forEach((w) => {
      w.style.display = "block";
      w.style.overflow = "hidden";
    });

    let time = 0;
    let raf = 0;
    let prevTs = 0;
    const STAGGER = 0.12;
    const DURATION = 1.2;
    const DELAY = 0.6;

    const animate = (ts: number) => {
      const dt = prevTs ? (ts - prevTs) / 1000 : 1 / 60;
      prevTs = ts;
      time += dt;

      let allDone = true;
      for (let i = 0; i < lines.length; i++) {
        const t = time - DELAY - i * STAGGER;
        const y = fit(t, 0, DURATION, 120, 0, ease.lusion);
        const r = fit(t, 0, DURATION * 0.8, 5, 0, ease.lusion);
        lines[i].style.transform = `translate3d(0, ${y}%, 0) rotate(${r}deg)`;
        if (y > 0.5) allDone = false;
      }

      if (allDone) {
        lines.forEach((l) => {
          l.style.transform = "none";
          l.style.willChange = "auto";
        });
      } else {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [lineCount]);

  return { lineRefs, wrapperRefs };
}

export default function Hero() {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lines = t.hero.lines;

  const { lineRefs, wrapperRefs } = useLineReveal(lines.length);

  // Scroll hint delayed entrance
  useEffect(() => {
    if (REDUCED || !scrollRef.current) return;
    const el = scrollRef.current;
    el.style.transform = "translate3d(0, 20px, 0)";
    el.style.opacity = "0";
    el.style.willChange = "transform, opacity";

    let time = 0;
    let raf = 0;
    let prevTs = 0;

    const animate = (ts: number) => {
      const dt = prevTs ? (ts - prevTs) / 1000 : 1 / 60;
      prevTs = ts;
      time += dt;

      const prog = time - 2.0;
      const y = fit(prog, 0, 0.8, 20, 0, ease.lusion);
      const opacity = fit(prog, 0, 0.5, 0, 1, ease.lusion);
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      el.style.opacity = String(opacity);

      if (y > 0.5 || opacity < 0.99) {
        raf = requestAnimationFrame(animate);
      } else {
        el.style.transform = "none";
        el.style.opacity = "1";
        el.style.willChange = "auto";
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Scroll-driven parallax fade + scale
  const scrollState = useRef({ y: 0, smoothY: 0 });

  const updateParallax = useCallback(() => {
    if (REDUCED || !sectionRef.current || !contentRef.current) return;

    scrollState.current.y = window.scrollY;
    scrollState.current.smoothY = lerp(
      scrollState.current.smoothY,
      scrollState.current.y,
      0.08,
    );

    const vh = window.innerHeight;
    const progress = scrollState.current.smoothY / vh;
    if (progress > 1.2) return;

    const opacity = fit(progress, 0, 0.6, 1, 0, ease.lusion);
    const scale = fit(progress, 0, 0.7, 1, 0.92, ease.lusion);
    const nameY = progress * -220;

    contentRef.current.style.opacity = String(opacity);
    contentRef.current.style.transform = `translate3d(0, ${nameY}px, 0) scale(${scale})`;
  }, []);

  useRAF(updateParallax);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen flex flex-col justify-end overflow-hidden"
    >
      {!REDUCED &&
        CROSS_POSITIONS.map((pos, i) => (
          <LusionCross
            key={i}
            delay={pos.delay}
            style={{ left: pos.x, top: pos.y }}
          />
        ))}

      <div ref={contentRef} className="relative z-10 w-full">
        <h1
          className="font-display font-bold leading-[0.82] tracking-[-0.04em] px-3 md:px-6 lg:px-8"
          style={{
            fontSize: "clamp(48px, 14vw, 280px)",
            marginBottom: "-0.05em",
          }}
          aria-label={lines.join(" ")}
        >
          {lines.map((line, i) => (
            <span
              key={i}
              ref={(el) => {
                wrapperRefs.current[i] = el;
              }}
              className="block overflow-hidden"
            >
              <span
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className="block text-white"
              >
                {line}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {!REDUCED && (
        <div
          ref={scrollRef}
          className="absolute bottom-5 right-5 md:bottom-8 md:right-10 z-10"
        >
          <span className="text-[10px] font-mono text-white/40 tracking-[0.25em] uppercase">
            {t.hero.scrollHint}
          </span>
        </div>
      )}
    </section>
  );
}
