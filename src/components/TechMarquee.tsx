import { useRef, useEffect, useCallback } from "react";
import { techStack } from "../data/content";
import { useLocale } from "../i18n/LocaleContext";
import { lerp } from "../lib/math";
import { useRAF } from "../hooks/useRAF";
import RevealOnScroll from "./ui/RevealOnScroll";
import { RevealHeading } from "./ui/RevealOnScroll";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const IS_COARSE =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

const techColorMap: Record<string, string> = {
  Python: "#3776AB",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Swift: "#F05138",
  Rust: "#CE422B",
  Java: "#ED8B00",
  React: "#61DAFB",
  "Vue 3": "#42B883",
  TailwindCSS: "#06B6D4",
  FastAPI: "#009688",
  "Node.js": "#339933",
  "Spring Boot": "#6DB33F",
  PyTorch: "#EE4C2C",
  GNN: "#5856D6",
  "MCP Protocol": "#FF3C5F",
  Docker: "#2496ED",
  Kubernetes: "#326CE5",
  "GitHub Actions": "#2088FF",
  MySQL: "#4479A1",
  MongoDB: "#47A248",
  Redis: "#DC382D",
  PostgreSQL: "#336791",
  "Deep Learning": "#FF6F00",
  Django: "#092E20",
};

function pillBg(tech: string): string {
  const hex = techColorMap[tech];
  if (!hex) return "rgba(88,86,214,0.15)";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},0.12)`;
}

function TechPill({ tech }: { tech: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMouseEnter = () => {
    if (IS_COARSE || REDUCED || !ref.current) return;
    ref.current.style.transform =
      "perspective(400px) rotateX(8deg) scale(1.05)";
    ref.current.style.background = pillBg(tech);
    ref.current.style.borderColor = "rgba(255,255,255,0.15)";
  };

  const onMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "";
    ref.current.style.background = "";
    ref.current.style.borderColor = "";
  };

  return (
    <span
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono text-text-secondary tracking-[0.02em] bg-white/[0.03] border border-white/[0.06]"
      style={{
        transition:
          "transform 300ms cubic-bezier(0.16,1,0.3,1), background 200ms ease, border-color 200ms ease",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: techColorMap[tech] ?? "#555560" }}
      />
      {tech}
    </span>
  );
}

/**
 * Lusion-style marquee: scroll velocity modulates marquee speed.
 * Uses RAF to continuously translate the row, accelerating when user scrolls.
 */
function MarqueeRow({
  items,
  reverse = false,
  baseSpeed,
}: {
  items: string[];
  reverse?: boolean;
  baseSpeed: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const smoothScrollSpeed = useRef(0);
  const lastScrollY = useRef(0);

  const update = useCallback(() => {
    if (REDUCED || !rowRef.current) return;

    // Detect scroll velocity
    const scrollDelta = Math.abs(window.scrollY - lastScrollY.current);
    lastScrollY.current = window.scrollY;
    smoothScrollSpeed.current = lerp(
      smoothScrollSpeed.current,
      scrollDelta,
      0.05,
    );

    // Modulate speed: base + scroll boost
    const speed = baseSpeed + smoothScrollSpeed.current * 0.3;
    const dir = reverse ? 1 : -1;
    offset.current += dir * speed;

    // Reset when one full set has scrolled
    const el = rowRef.current;
    const halfWidth = el.scrollWidth / 2;
    if (Math.abs(offset.current) >= halfWidth) {
      offset.current = offset.current % halfWidth;
    }

    el.style.transform = `translate3d(${offset.current}px, 0, 0)`;
  }, [baseSpeed, reverse]);

  useRAF(update);

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-3">
      <div
        ref={rowRef}
        className="flex gap-4 whitespace-nowrap w-max"
        style={{ willChange: "transform" }}
      >
        {doubled.map((item, i) => (
          <TechPill key={`${item}-${i}`} tech={item} />
        ))}
      </div>
    </div>
  );
}

/**
 * Lusion-style cross decoration for section headers.
 */
function SectionCross({ delay }: { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (REDUCED || !ref.current) return;
    const el = ref.current;
    el.style.transform = "scale(0) rotate(0deg)";
    el.style.opacity = "0";
    let time = 0;
    let triggered = false;
    let raf = 0;
    let prevTs = 0;

    const animate = (ts: number) => {
      const dt = prevTs ? (ts - prevTs) / 1000 : 1 / 60;
      prevTs = ts;
      time += dt;
      const t = time - delay;
      const s = Math.min(
        Math.max((t / 0.6) * (t / 0.6) * (3 - 2 * (t / 0.6)), 0),
        1,
      );
      const r = s * 180;
      const o = Math.min(t / 0.3, 1);
      el.style.transform = `scale(${s}) rotate(${r}deg)`;
      el.style.opacity = String(Math.max(o, 0));
      if (s < 0.99) {
        raf = requestAnimationFrame(animate);
      } else {
        el.style.willChange = "auto";
      }
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !triggered) {
            triggered = true;
            raf = requestAnimationFrame(animate);
            obs.disconnect();
          }
        });
      },
      { rootMargin: "-10% 0px -10% 0px" },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className="text-text-muted/30 select-none"
      style={{
        fontSize: "18px",
        lineHeight: 1,
        willChange: "transform, opacity",
      }}
    >
      ✕
    </div>
  );
}

export default function TechMarquee() {
  const { t } = useLocale();
  const mid = Math.ceil(techStack.length / 2);
  const row1 = techStack.slice(0, mid);
  const row2 = techStack.slice(mid);

  return (
    <section id="stack" className="relative py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 relative">
        <RevealHeading
          className="font-display font-bold text-text-primary"
          style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
        >
          {`${t.techStack.heading[0]} ${t.techStack.heading[1]}`}
        </RevealHeading>

        {!REDUCED && (
          <div className="absolute top-2 right-0 flex gap-3 opacity-40">
            {[0, 1, 2, 3].map((i) => (
              <SectionCross key={i} delay={i * 0.1} />
            ))}
          </div>
        )}
      </div>

      <div className="relative overflow-hidden py-6">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-dark to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-dark to-transparent pointer-events-none" />

        <RevealOnScroll delay={0} clipReveal>
          <MarqueeRow items={row1} baseSpeed={0.5} />
        </RevealOnScroll>
        <RevealOnScroll delay={0.15} clipReveal>
          <MarqueeRow items={row2} reverse baseSpeed={0.4} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
