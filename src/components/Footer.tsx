import { useRef, useEffect, useState } from "react";
import { siteConfig } from "../data/content";
import { useLocale } from "../i18n/LocaleContext";
import { ease } from "../lib/ease";
import { fit, clamp } from "../lib/math";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-text-secondary hover:text-text-primary transition-colors text-sm"
    >
      {children}
    </a>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (REDUCED || !ref.current) return;
    const el = ref.current;

    let time = 0;
    let raf = 0;
    let prevTs = 0;

    const animate = (ts: number) => {
      const dt = prevTs ? (ts - prevTs) / 1000 : 1 / 60;
      prevTs = ts;

      time = clamp(time + (visible ? dt : -dt * 2), 0, 2);
      const y = fit(time, 0, 0.6, 150, 0, ease.lusion);
      const rot = fit(time, 0, 0.6, 10, 0, ease.lusion);
      const opacity = ease.lusion(clamp(time / 0.6, 0, 1));
      el.style.transform = `translate3d(0, ${y}%, 0) rotate(${rot}deg)`;
      el.style.opacity = String(opacity);

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  return (
    <button
      ref={ref}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors tracking-[0.1em] uppercase glass-interactive overflow-hidden"
      style={{ opacity: 0 }}
      aria-label="Back to top"
    >
      Back to top
    </button>
  );
}

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="relative border-t border-white/[0.06] py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <span className="font-display font-bold text-2xl text-text-primary">
            WZ<span className="text-coral">.</span>
          </span>
          <BackToTop />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <span className="text-xs font-mono text-text-muted tracking-[0.15em] uppercase mb-3 block">
              Location
            </span>
            <p className="text-sm text-text-secondary leading-relaxed">
              {t.footer.address}
            </p>
          </div>

          <div>
            <span className="text-xs font-mono text-text-muted tracking-[0.15em] uppercase mb-3 block">
              Social
            </span>
            <div className="flex flex-col gap-2">
              <FooterLink href={siteConfig.github} external>
                GitHub
              </FooterLink>
              <FooterLink href={`mailto:${siteConfig.email}`}>Email</FooterLink>
            </div>
          </div>

          <div>
            <span className="text-xs font-mono text-text-muted tracking-[0.15em] uppercase mb-3 block">
              Contact
            </span>
            <div className="flex flex-col gap-2">
              <FooterLink href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </FooterLink>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted border-t border-white/[0.06] pt-8">
          <span>{t.footer.copyright}</span>
          <span>
            {t.footer.builtBy}{" "}
            <FooterLink href={siteConfig.github} external>
              {siteConfig.name}
            </FooterLink>
            {t.footer.builtBySuffix} with ❤️
          </span>
        </div>
      </div>
    </footer>
  );
}
