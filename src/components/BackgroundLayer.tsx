import { useRef, useEffect, useCallback } from "react";
import { lerp } from "../lib/math";
import { useRAF } from "../hooks/useRAF";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const SECTION_COLORS: Record<string, [number, number, number, number]> = {
  hero: [0, 0, 0, 0],
  projects: [255, 60, 95, 0.018],
  stack: [88, 86, 214, 0.022],
  papers: [88, 86, 214, 0.016],
  contact: [200, 255, 0, 0.018],
};

export default function BackgroundLayer() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const currentColor = useRef({ r: 0, g: 0, b: 0, a: 0 });
  const targetColor = useRef({ r: 0, g: 0, b: 0, a: 0 });

  useEffect(() => {
    if (REDUCED) return;
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const c = SECTION_COLORS[entry.target.id];
            if (c) {
              targetColor.current = { r: c[0], g: c[1], b: c[2], a: c[3] };
            } else {
              targetColor.current = { r: 0, g: 0, b: 0, a: 0 };
            }
          }
        });
      },
      { rootMargin: "-30% 0px -30% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const update = useCallback(() => {
    if (REDUCED || !overlayRef.current) return;

    const t = targetColor.current;
    const c = currentColor.current;
    c.r = lerp(c.r, t.r, 0.02);
    c.g = lerp(c.g, t.g, 0.02);
    c.b = lerp(c.b, t.b, 0.02);
    c.a = lerp(c.a, t.a, 0.02);
    if (c.a > 0.001) {
      overlayRef.current.style.backgroundColor = `rgba(${Math.round(c.r)},${Math.round(c.g)},${Math.round(c.b)},${c.a.toFixed(4)})`;
    } else {
      overlayRef.current.style.backgroundColor = "transparent";
    }
  }, []);

  useRAF(update);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ willChange: "background-color" }}
      />
    </div>
  );
}
