import { useEffect, useRef, useCallback } from "react";
import { lerp } from "../lib/math";

const TRAIL_LERPS = [0.08, 0.12, 0.18] as const;

type CursorMode = "default" | "link" | "button" | "open";

interface RingState {
  width: string;
  height: string;
  borderColor: string;
  background: string;
  boxShadow: string;
  opacity: string;
}

const SECTION_ACCENTS: Record<string, string> = {
  hero: "255,60,95",
  projects: "255,60,95",
  stack: "88,86,214",
  papers: "88,86,214",
  contact: "200,255,0",
};

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function getRingStates(accent: string): Record<CursorMode, RingState> {
  return {
    default: {
      width: "36px",
      height: "36px",
      borderColor: `rgba(${accent},0.45)`,
      background: "transparent",
      boxShadow: "none",
      opacity: "1",
    },
    link: {
      width: "52px",
      height: "52px",
      borderColor: `rgba(${accent},0.6)`,
      background: `rgba(${accent},0.08)`,
      boxShadow: `0 0 12px rgba(${accent},0.2)`,
      opacity: "0.9",
    },
    button: {
      width: "44px",
      height: "44px",
      borderColor: `rgba(${accent},0.7)`,
      background: `rgba(${accent},0.1)`,
      boxShadow: `0 0 12px rgba(${accent},0.25)`,
      opacity: "0.9",
    },
    open: {
      width: "72px",
      height: "72px",
      borderColor: `rgba(${accent},0.8)`,
      background: `rgba(${accent},0.12)`,
      boxShadow: `0 0 16px rgba(${accent},0.3)`,
      opacity: "0.95",
    },
  };
}

function applyRingState(el: HTMLDivElement, state: RingState) {
  el.style.width = state.width;
  el.style.height = state.height;
  el.style.borderColor = state.borderColor;
  el.style.background = state.background;
  el.style.boxShadow = state.boxShadow;
  el.style.opacity = state.opacity;
}

export default function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const openLabel = useRef<HTMLSpanElement>(null);
  const trail0 = useRef<HTMLDivElement>(null);
  const trail1 = useRef<HTMLDivElement>(null);
  const trail2 = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const prevMouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const trailPos = useRef([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const velocity = useRef(0);
  const smoothVelocity = useRef(0);
  const currentMode = useRef<CursorMode>("default");
  const currentAccent = useRef("255,255,255");

  const detectSection = useCallback(() => {
    const sections = document.querySelectorAll("section[id]");
    const y = window.scrollY + window.innerHeight / 2;
    let found = "255,255,255";
    sections.forEach((s) => {
      const el = s as HTMLElement;
      if (el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
        found = SECTION_ACCENTS[el.id] ?? "255,255,255";
      }
    });
    return found;
  }, []);

  useEffect(() => {
    if (REDUCED) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const trailRefs = [trail0, trail1, trail2];
    let raf = 0;

    const updateAccentFromSection = () => {
      const accent = detectSection();
      if (accent !== currentAccent.current) {
        currentAccent.current = accent;
        const states = getRingStates(accent);
        if (ring.current) {
          applyRingState(ring.current, states[currentMode.current]);
        }
        trailRefs.forEach((ref, i) => {
          if (ref.current) {
            ref.current.style.background = `rgba(${accent},${0.4 - i * 0.1})`;
          }
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      prevMouse.current.x = mouse.current.x;
      prevMouse.current.y = mouse.current.y;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dot.current) {
        dot.current.style.left = e.clientX + "px";
        dot.current.style.top = e.clientY + "px";
      }
    };

    const animate = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Velocity calculation for ring morphing
      const dx = mx - prevMouse.current.x;
      const dy = my - prevMouse.current.y;
      velocity.current = Math.min(Math.hypot(dx, dy), 100);
      smoothVelocity.current = lerp(
        smoothVelocity.current,
        velocity.current,
        0.08,
      );

      // Ring position
      ringPos.current.x += (mx - ringPos.current.x) * 0.12;
      ringPos.current.y += (my - ringPos.current.y) * 0.12;

      if (ring.current) {
        ring.current.style.left = ringPos.current.x + "px";
        ring.current.style.top = ringPos.current.y + "px";

        // Velocity-based ring stretch (Lusion style)
        const stretch = 1 + smoothVelocity.current * 0.008;
        const angle =
          Math.atan2(my - ringPos.current.y, mx - ringPos.current.x) *
          (180 / Math.PI);
        ring.current.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scaleX(${stretch}) scaleY(${2 - stretch})`;
      }

      // Trails
      const sources = [
        { x: ringPos.current.x, y: ringPos.current.y },
        trailPos.current[0],
        trailPos.current[1],
      ];
      for (let i = 0; i < TRAIL_LERPS.length; i++) {
        const src = sources[i];
        trailPos.current[i].x +=
          (src.x - trailPos.current[i].x) * TRAIL_LERPS[i];
        trailPos.current[i].y +=
          (src.y - trailPos.current[i].y) * TRAIL_LERPS[i];
        const el = trailRefs[i].current;
        if (el) {
          el.style.left = trailPos.current[i].x + "px";
          el.style.top = trailPos.current[i].y + "px";
        }
      }

      raf = requestAnimationFrame(animate);
    };

    const resolveMode = (target: Element | null): CursorMode => {
      if (!target) return "default";
      if (target.closest("[data-cursor='open']")) return "open";
      if (target.closest("button")) return "button";
      if (target.closest("a")) return "link";
      if (target.closest(".cursor-hover")) return "button";
      return "default";
    };

    const onEnter = (e: Event) => {
      const mode = resolveMode(e.target as Element);
      if (mode === currentMode.current) return;
      currentMode.current = mode;
      if (!ring.current) return;
      const states = getRingStates(currentAccent.current);
      applyRingState(ring.current, states[mode]);
      if (openLabel.current) {
        openLabel.current.style.opacity = mode === "open" ? "1" : "0";
      }
    };

    const onLeave = (e: Event) => {
      const rel = (e as MouseEvent).relatedTarget as Element | null;
      const mode = resolveMode(rel);
      if (mode === currentMode.current) return;
      currentMode.current = mode;
      if (!ring.current) return;
      const states = getRingStates(currentAccent.current);
      applyRingState(ring.current, states[mode]);
      if (openLabel.current) {
        openLabel.current.style.opacity = mode === "open" ? "1" : "0";
      }
    };

    const onScroll = () => updateAccentFromSection();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.body.addEventListener("mouseover", onEnter);
    document.body.addEventListener("mouseout", onLeave);
    updateAccentFromSection();

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.body.removeEventListener("mouseover", onEnter);
      document.body.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [detectSection]);

  if (REDUCED) return null;

  const accent = currentAccent.current;

  return (
    <>
      <div
        ref={ring}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
        style={{
          width: "36px",
          height: "36px",
          border: "1px solid",
          borderColor: `rgba(${accent},0.45)`,
          background: "transparent",
          transition:
            "width 200ms ease, height 200ms ease, border-color 200ms ease, background 200ms ease, box-shadow 200ms ease, opacity 200ms ease",
          willChange: "transform",
        }}
      >
        <span
          ref={openLabel}
          className="font-mono text-white select-none"
          style={{
            fontSize: "8px",
            opacity: 0,
            transition: "opacity 200ms ease",
            letterSpacing: "0.05em",
          }}
        >
          OPEN
        </span>
      </div>

      <div
        ref={dot}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ background: `rgba(${accent},0.9)` }}
      />

      {TRAIL_LERPS.map((_, i) => (
        <div
          key={i}
          ref={[trail0, trail1, trail2][i]}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
          style={{
            width: `${4 - i}px`,
            height: `${4 - i}px`,
            background: `rgba(255,255,255,${0.4 - i * 0.1})`,
          }}
        />
      ))}
    </>
  );
}
