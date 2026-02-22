import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const TRAIL_LERPS = [0.08, 0.12, 0.18] as const;
const TEXT_MUTED = "#8E8E93";

type CursorMode = "default" | "link" | "button" | "open";

interface RingState {
  width: string;
  height: string;
  borderColor: string;
  boxShadow: string;
  opacity: string;
}

const RING_STATES: Record<CursorMode, RingState> = {
  default: {
    width: "24px",
    height: "24px",
    borderColor: TEXT_MUTED,
    boxShadow: "none",
    opacity: "1",
  },
  link: {
    width: "56px",
    height: "56px",
    borderColor: "#5856D6",
    boxShadow: "0 0 12px rgba(88,86,214,0.5)",
    opacity: "0.8",
  },
  button: {
    width: "56px",
    height: "56px",
    borderColor: "#FF3C5F",
    boxShadow: "0 0 12px rgba(255,60,95,0.5)",
    opacity: "0.8",
  },
  open: {
    width: "80px",
    height: "80px",
    borderColor: "#FF3C5F",
    boxShadow: "0 0 12px rgba(255,60,95,0.5)",
    opacity: "0.9",
  },
};

function applyRingState(el: HTMLDivElement, state: RingState) {
  el.style.width = state.width;
  el.style.height = state.height;
  el.style.borderColor = state.borderColor;
  el.style.boxShadow = state.boxShadow;
  el.style.opacity = state.opacity;
}

export default function CustomCursor() {
  const reduced = useReducedMotion();
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const openLabel = useRef<HTMLSpanElement>(null);
  const trail0 = useRef<HTMLDivElement>(null);
  const trail1 = useRef<HTMLDivElement>(null);
  const trail2 = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const trailPos = useRef([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const isMoving = useRef(false);
  const currentMode = useRef<CursorMode>("default");

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const trailRefs = [trail0, trail1, trail2];
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dot.current) {
        dot.current.style.left = e.clientX + "px";
        dot.current.style.top = e.clientY + "px";
      }
      if (!isMoving.current) {
        isMoving.current = true;
        raf = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      ringPos.current.x += (mx - ringPos.current.x) * 0.12;
      ringPos.current.y += (my - ringPos.current.y) * 0.12;

      if (ring.current) {
        ring.current.style.left = ringPos.current.x + "px";
        ring.current.style.top = ringPos.current.y + "px";
      }

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

      const stillX = Math.abs(mx - ringPos.current.x) > 0.1;
      const stillY = Math.abs(my - ringPos.current.y) > 0.1;
      if (stillX || stillY) {
        raf = requestAnimationFrame(animate);
      } else {
        isMoving.current = false;
      }
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
      applyRingState(ring.current, RING_STATES[mode]);
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
      applyRingState(ring.current, RING_STATES[mode]);
      if (openLabel.current) {
        openLabel.current.style.opacity = mode === "open" ? "1" : "0";
      }
    };

    window.addEventListener("mousemove", onMove);
    document.body.addEventListener("mouseover", onEnter);
    document.body.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseover", onEnter);
      document.body.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      <div
        ref={ring}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:flex items-center justify-center"
        style={{
          width: "24px",
          height: "24px",
          border: "1px solid",
          borderColor: TEXT_MUTED,
          transition:
            "width 200ms ease, height 200ms ease, border-color 200ms ease, box-shadow 200ms ease, opacity 200ms ease",
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
        className="fixed top-0 left-0 w-1 h-1 bg-coral rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />

      {TRAIL_LERPS.map((_, i) => (
        <div
          key={i}
          ref={[trail0, trail1, trail2][i]}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block bg-coral"
          style={{
            width: `${4 - i}px`,
            height: `${4 - i}px`,
            opacity: 0.3 - i * 0.08,
          }}
        />
      ))}
    </>
  );
}
