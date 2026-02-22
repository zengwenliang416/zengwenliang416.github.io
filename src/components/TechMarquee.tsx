import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { techStack } from "../data/content";
import { useLocale } from "../i18n/LocaleContext";
import RevealOnScroll from "./ui/RevealOnScroll";
import GlassSection from "./glass/GlassSection";

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

const INDIGO_DIM = "rgba(88,86,214,0.10)";

const IS_COARSE =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

function pillBg(tech: string): string {
  const hex = techColorMap[tech];
  if (!hex) return INDIGO_DIM;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},0.15)`;
}

function TechPill({
  tech,
  disableRotate,
}: {
  tech: string;
  disableRotate: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMouseEnter = () => {
    if (disableRotate || !ref.current) return;
    ref.current.style.transform = "perspective(400px) rotateX(8deg)";
    ref.current.style.background = pillBg(tech);
  };

  const onMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "";
    ref.current.style.background = "";
  };

  return (
    <span
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono text-text-muted tracking-[0.02em] bg-black/[0.03] border border-black/[0.06]"
      style={{ transition: "transform 200ms ease, background 200ms ease" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
      {tech}
    </span>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  duration,
}: {
  items: string[];
  reverse?: boolean;
  duration: number;
}) {
  const reduced = useReducedMotion();
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-3">
      <div
        className={`flex gap-4 whitespace-nowrap w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} hover:pause-animation`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <TechPill
            key={`${item}-${i}`}
            tech={item}
            disableRotate={IS_COARSE || reduced === true}
          />
        ))}
      </div>
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
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, rgba(88,86,214,0.06), transparent 20%, transparent 80%, rgba(88,86,214,0.06))",
        }}
      />

      <RevealOnScroll>
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <h2
            className="font-display font-bold text-text-primary"
            style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
          >
            {t.techStack.heading[0]}{" "}
            <span className="text-gradient-lime">{t.techStack.heading[1]}</span>
          </h2>
        </div>
      </RevealOnScroll>

      <GlassSection fullWidth preset="marquee" className="w-full py-6">
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#F2F2F7]/80 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#F2F2F7]/80 to-transparent pointer-events-none" />

          <RevealOnScroll delay={0} slideX={false}>
            <MarqueeRow items={row1} duration={28} />
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} slideX={false}>
            <MarqueeRow items={row2} reverse duration={32} />
          </RevealOnScroll>
        </div>
      </GlassSection>
    </section>
  );
}
