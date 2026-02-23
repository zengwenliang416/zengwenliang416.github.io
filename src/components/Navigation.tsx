import { useState, useEffect, useCallback, useRef } from "react";
import { siteConfig } from "../data/content";
import { useLocale } from "../i18n/LocaleContext";
import GlassNav from "./glass/GlassNav";
import MagneticWrapper from "./ui/MagneticWrapper";
import { ease } from "../lib/ease";
import { fit, clamp } from "../lib/math";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function MenuOverlay({
  open,
  links,
  activeSection,
  contactLabel,
  email,
  onClose,
}: {
  open: boolean;
  links: { href: string; label: string }[];
  activeSection: string;
  contactLabel: string;
  email: string;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (REDUCED) {
      overlay.style.opacity = open ? "1" : "0";
      overlay.style.pointerEvents = open ? "auto" : "none";
      return;
    }

    const items = itemRefs.current.filter(Boolean) as HTMLElement[];
    let time = 0;
    let raf = 0;
    let prevTs = 0;

    if (open) {
      overlay.style.pointerEvents = "auto";
      items.forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translate3d(0, 20px, 0)";
      });
    }

    const animate = (ts: number) => {
      const dt = prevTs ? (ts - prevTs) / 1000 : 1 / 60;
      prevTs = ts;
      time = clamp(time + (open ? dt : -dt * 2), 0, 3);

      const overlayOpacity = fit(time, 0, 0.25, 0, 1, ease.lusion);
      overlay.style.opacity = String(overlayOpacity);

      if (!open && overlayOpacity <= 0.01) {
        overlay.style.pointerEvents = "none";
        return;
      }

      items.forEach((item, i) => {
        const t = time - 0.1 - i * 0.06;
        const y = fit(t, 0, 0.5, 20, 0, ease.lusion);
        const opacity = fit(t, 0, 0.35, 0, 1, ease.lusion);
        item.style.transform = `translate3d(0, ${y}px, 0)`;
        item.style.opacity = String(opacity);
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [open]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[998] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center gap-6"
      style={{ opacity: 0, pointerEvents: "none" }}
    >
      {links.map((link, i) => (
        <a
          key={link.href}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          href={link.href}
          onClick={onClose}
          className={`text-3xl md:text-5xl font-display font-bold transition-colors ${
            activeSection === link.href.slice(1)
              ? "text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          {link.label}
        </a>
      ))}
      <a
        ref={(el) => {
          itemRefs.current[links.length] = el;
        }}
        href={`mailto:${email}`}
        onClick={onClose}
        className="mt-4 px-8 py-3 rounded-full border border-white/15 text-white text-sm font-medium hover:bg-white/5 transition-colors"
      >
        {contactLabel}
      </a>
    </div>
  );
}

function WaveIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M2 12c2-3 4-6 6-6s4 6 6 6 4-6 6-6" />
    </svg>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <GlassNav scrolled={scrolled}>
        <div className="w-full px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo - Lusion uses bold brand name top-left */}
          <a
            href="#"
            className="font-display font-black text-[15px] tracking-tight text-white hover:opacity-80 transition-opacity"
          >
            WENLIANG
          </a>

          {/* Right side pills - matching Lusion: wave icon | LET'S TALK · | MENU ·· */}
          <div className="flex items-center gap-[6px]">
            {/* Wave / sine icon pill (Lusion has this) */}
            <MagneticWrapper strength={0.2}>
              <button
                onClick={() => setLocale(locale === "en" ? "zh" : "en")}
                className="w-9 h-9 rounded-full border border-white/[0.12] text-white/50 hover:text-white hover:border-white/20 transition-all flex items-center justify-center"
                aria-label="Toggle language"
              >
                <WaveIcon />
              </button>
            </MagneticWrapper>

            {/* LET'S TALK pill */}
            <MagneticWrapper strength={0.2}>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hidden md:flex h-9 px-4 rounded-full border border-white/[0.12] text-white/60 text-[12px] font-medium tracking-wide hover:bg-white/[0.04] hover:text-white hover:border-white/20 transition-all items-center gap-[6px]"
              >
                LET'S TALK
                <span className="w-[5px] h-[5px] rounded-full bg-white/30" />
              </a>
            </MagneticWrapper>

            {/* MENU pill - white bg like Lusion */}
            <MagneticWrapper strength={0.2}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="h-9 px-4 rounded-full bg-white text-black text-[12px] font-semibold tracking-wide hover:bg-white/90 transition-all flex items-center gap-[6px]"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? "CLOSE" : "MENU"}
                <span className="flex gap-[2px]">
                  <span className="w-[4px] h-[4px] rounded-full bg-black/50" />
                  <span className="w-[4px] h-[4px] rounded-full bg-black/50" />
                </span>
              </button>
            </MagneticWrapper>
          </div>
        </div>
      </GlassNav>

      <MenuOverlay
        open={menuOpen}
        links={t.nav.links}
        activeSection={activeSection}
        contactLabel={t.nav.contact}
        email={siteConfig.email}
        onClose={closeMenu}
      />
    </>
  );
}
