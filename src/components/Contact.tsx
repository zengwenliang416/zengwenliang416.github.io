import { useRef, useCallback } from "react";
import { siteConfig } from "../data/content";
import { useLocale } from "../i18n/LocaleContext";
import { useRAF } from "../hooks/useRAF";
import { lerp, clamp } from "../lib/math";
import { useSplitTextReveal } from "../hooks/useSplitTextReveal";
import RevealOnScroll from "./ui/RevealOnScroll";
import { RevealHeading } from "./ui/RevealOnScroll";
import MagneticWrapper from "./ui/MagneticWrapper";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Contact() {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const smoothBgY = useRef(0);

  const descRef = useSplitTextReveal({
    translateEm: 1.5,
    rotateDeg: 8,
    staggerDivisor: 10,
  });

  const updateParallax = useCallback(() => {
    if (REDUCED || !sectionRef.current || !bgRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const ratio = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
    const target = (ratio - 0.5) * -80;
    smoothBgY.current = lerp(smoothBgY.current, target, 0.04);
    bgRef.current.style.transform = `translate3d(0, ${smoothBgY.current}px, 0)`;
  }, []);

  useRAF(updateParallax);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 px-6 overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          willChange: "transform",
          background: `
            radial-gradient(ellipse 70% 60% at 20% 90%, rgba(255,60,95,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 10%, rgba(200,255,0,0.05) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(88,86,214,0.06) 0%, transparent 50%)
          `,
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto">
        <RevealOnScroll clipReveal>
          <div className="p-12 md:p-20 text-center">
            <RevealOnScroll>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted mb-6">
                {t.contact.eyebrow}
              </p>
            </RevealOnScroll>

            <RevealHeading
              className="font-display font-bold text-text-primary mb-4"
              style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
            >
              {`${t.contact.heading[0]} ${t.contact.heading[1]}`}
            </RevealHeading>

            <p
              ref={descRef as React.RefObject<HTMLParagraphElement>}
              className="text-[16px] text-text-secondary leading-[1.65] max-w-xl mx-auto mb-10"
            >
              {t.contact.description}
            </p>

            <RevealOnScroll delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticWrapper strength={0.3}>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="group relative px-8 py-4 rounded-full text-base font-semibold min-h-[44px] flex items-center gap-2 overflow-hidden transition-colors glass-interactive bg-coral text-white hover:bg-coral/90 hover:shadow-[0_0_30px_rgba(255,60,95,0.3)]"
                  >
                    {t.contact.emailBtn}
                  </a>
                </MagneticWrapper>

                <MagneticWrapper strength={0.2}>
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-4 rounded-full text-base font-semibold text-text-primary min-h-[44px] flex items-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] transition-all duration-300 glass-interactive"
                  >
                    {t.contact.githubBtn}
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M4 12L12 4M12 4H6M12 4v6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </MagneticWrapper>
              </div>
            </RevealOnScroll>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
