import { useRef, useEffect, useCallback } from "react";
import { publications } from "../data/content";
import { useLocale } from "../i18n/LocaleContext";
import { useRAF } from "../hooks/useRAF";
import { ease } from "../lib/ease";
import { fit, lerp, clamp } from "../lib/math";
import RevealOnScroll from "./ui/RevealOnScroll";
import { RevealHeading } from "./ui/RevealOnScroll";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Lusion-style cross decoration, triggered on scroll.
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

/**
 * Lusion-style publication card with parallax + tag stagger entrance.
 */
function PubCard({
  pub,
  index,
}: {
  pub: (typeof publications)[number];
  index: number;
}) {
  const { t } = useLocale();
  const tr = t.publications.items[pub.title];
  const ref = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const smoothY = useRef(0);

  // Tag stagger entrance
  useEffect(() => {
    if (REDUCED || !tagsRef.current) return;
    const tags = tagsRef.current.querySelectorAll<HTMLElement>("[data-tag]");
    tags.forEach((tag) => {
      tag.style.transform = "translate3d(0, 100%, 0)";
      tag.style.opacity = "0";
    });

    let triggered = false;
    let time = 0;
    let raf = 0;
    let prevTs = 0;

    const animate = (ts: number) => {
      const dt = prevTs ? (ts - prevTs) / 1000 : 1 / 60;
      prevTs = ts;
      time += dt;
      let allDone = true;
      tags.forEach((tag, i) => {
        const tLocal = time - i * 0.06;
        const y = fit(tLocal, 0, 0.5, 100, 0, ease.lusion);
        const o = fit(tLocal, 0, 0.3, 0, 1, ease.lusion);
        tag.style.transform = `translate3d(0, ${y}%, 0)`;
        tag.style.opacity = String(o);
        if (y > 0.5) allDone = false;
      });
      if (!allDone) {
        raf = requestAnimationFrame(animate);
      } else {
        tags.forEach((tag) => {
          tag.style.transform = "translate3d(0, 0, 0)";
          tag.style.opacity = "1";
        });
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
      { rootMargin: "-5% 0px -5% 0px" },
    );
    if (tagsRef.current) obs.observe(tagsRef.current);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const update = useCallback(() => {
    if (REDUCED || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const ratio = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
    const target = (ratio - 0.5) * -30;
    smoothY.current = lerp(smoothY.current, target, 0.06);
    ref.current.style.transform = `translate3d(0, ${smoothY.current}px, 0)`;
  }, []);

  useRAF(update);

  return (
    <div ref={ref} style={{ willChange: REDUCED ? "auto" : "transform" }}>
      <RevealOnScroll delay={index * 0.12} clipReveal>
        <a
          href={pub.doi}
          target="_blank"
          rel="noopener noreferrer"
          className="group block h-full p-8 rounded-xl border border-white/[0.06] bg-dark-card hover:border-white/[0.12] hover:bg-white/[0.03] hover:-translate-y-1 transition-all duration-500 glass-interactive"
          style={{ contain: "layout style" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-mono text-lime bg-lime-dim border border-white/[0.06] rounded-full">
              {pub.journal}
            </span>
          </div>

          <h3 className="text-xl font-bold text-text-primary leading-tight mb-3 group-hover:text-coral transition-colors duration-300">
            {pub.title}
          </h3>

          <p className="text-sm text-text-muted mb-4">{pub.authors}</p>

          <p className="text-[15px] text-text-secondary leading-[1.65] mb-6">
            {tr?.desc ?? pub.title}
          </p>

          <div ref={tagsRef} className="flex flex-wrap gap-2 overflow-hidden">
            {pub.tags.map((tag) => (
              <span
                key={tag}
                data-tag
                className="px-3 py-1 rounded-full text-xs font-mono text-text-muted bg-white/[0.03] border border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>
        </a>
      </RevealOnScroll>
    </div>
  );
}

export default function Publications() {
  const { t } = useLocale();
  const gridRef = useRef<HTMLDivElement>(null);
  const smoothOpacity = useRef(0);

  const updateGrid = useCallback(() => {
    if (REDUCED || !gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const ratio = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
    const target = ratio > 0.15 && ratio < 0.85 ? 1 : 0;
    smoothOpacity.current = lerp(smoothOpacity.current, target, 0.04);
    gridRef.current.style.opacity = String(smoothOpacity.current);
  }, []);

  useRAF(updateGrid);

  return (
    <section id="papers" className="relative py-32 px-6">
      {/* Cross decorations */}
      {!REDUCED && (
        <div className="absolute top-28 left-8 md:left-16 flex gap-3 opacity-40">
          {[0, 1, 2, 3].map((i) => (
            <SectionCross key={i} delay={i * 0.1} />
          ))}
        </div>
      )}

      <div
        ref={gridRef}
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 80px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 80px)
          `,
          opacity: 0,
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <RevealOnScroll clipReveal>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted mb-3">
            {t.publications.eyebrow}
          </p>
        </RevealOnScroll>

        <RevealHeading
          className="font-display font-bold text-text-primary mb-16"
          style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
        >
          {`${t.publications.heading[0]} ${t.publications.heading[1]}`}
        </RevealHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {publications.map((pub, i) => (
            <PubCard key={pub.title} pub={pub} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
