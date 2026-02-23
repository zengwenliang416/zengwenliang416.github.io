import { useRef, useEffect, type ReactNode } from "react";
import { clamp } from "../../lib/math";

interface GlassNavProps {
  scrolled: boolean;
  children: ReactNode;
}

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Lusion-style nav with RAF-driven scroll progress bar.
 * No framer-motion — pure DOM manipulation.
 */
export default function GlassNav({ scrolled, children }: GlassNavProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (REDUCED || !barRef.current) return;
    let raf = 0;

    const update = () => {
      if (!barRef.current) return;
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docH > 0 ? clamp(scrollY / docH, 0, 1) : 0;
      barRef.current.style.transform = `scaleX(${progress})`;
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <nav
      className={`glass-nav fixed top-0 left-0 right-0 z-50 w-full ${scrolled ? "glass-nav--scrolled" : ""}`}
    >
      {children}
      {!REDUCED && (
        <div
          ref={barRef}
          className="absolute bottom-0 left-0 right-0 h-[1px] origin-left"
          style={{
            transform: "scaleX(0)",
            background:
              "linear-gradient(90deg, rgba(255,60,95,0.8), rgba(88,86,214,0.8), rgba(200,255,0,0.6))",
            willChange: "transform",
          }}
        />
      )}
    </nav>
  );
}
