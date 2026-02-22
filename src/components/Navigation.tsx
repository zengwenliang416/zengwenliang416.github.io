import { useState, useEffect, useCallback } from "react";
import { siteConfig } from "../data/content";
import { useLocale } from "../i18n/LocaleContext";
import GlassNav from "./glass/GlassNav";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
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

  return (
    <GlassNav scrolled={scrolled}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-display font-black text-lg tracking-tight hover:text-coral transition-colors"
          style={{ color: "#1C1C1E" }}
        >
          WZ<span className="text-coral">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-3 py-1.5 text-sm font-medium transition-colors duration-150 glass-interactive"
              style={{ color: "#3A3A3C" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocale(locale === "en" ? "zh" : "en")}
            className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors glass-interactive px-2 py-1"
          >
            {locale === "en" ? "中" : "EN"}
          </button>

          <a
            href={`mailto:${siteConfig.email}`}
            className="hidden md:flex px-4 py-2 rounded-full bg-coral text-white text-sm font-semibold hover:bg-coral/90 transition-colors min-h-[44px] items-center"
          >
            {t.nav.contact}
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden p-2 glass-interactive"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1C1C1E"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className="md:hidden px-6 pb-4 flex flex-col gap-2">
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="block px-3 py-2 text-sm font-medium rounded-lg glass-interactive"
              style={{ color: "#3A3A3C" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${siteConfig.email}`}
            onClick={closeMenu}
            className="mt-2 px-4 py-2 rounded-full bg-coral text-white text-sm font-semibold text-center hover:bg-coral/90 transition-colors min-h-[44px] flex items-center justify-center"
          >
            {t.nav.contact}
          </a>
        </nav>
      )}
    </GlassNav>
  );
}
