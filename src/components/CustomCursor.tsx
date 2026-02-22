import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const pos = useRef({ cx: 0, cy: 0, mx: 0, my: 0 });
  const isMoving = useRef(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      if (!isMoving.current) {
        isMoving.current = true;
        raf = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      const p = pos.current;
      p.cx += (p.mx - p.cx) * 0.12;
      p.cy += (p.my - p.cy) * 0.12;
      if (ring.current) {
        ring.current.style.left = p.cx + "px";
        ring.current.style.top = p.cy + "px";
      }
      if (dot.current) {
        dot.current.style.left = p.mx + "px";
        dot.current.style.top = p.my + "px";
      }
      if (Math.abs(p.mx - p.cx) > 0.1 || Math.abs(p.my - p.cy) > 0.1) {
        raf = requestAnimationFrame(animate);
      } else {
        isMoving.current = false;
      }
    };

    window.addEventListener("mousemove", onMove);

    const onEnter = (e: Event) => {
      const target = (e.target as Element)?.closest?.(
        "a, button, .cursor-hover",
      );
      if (target)
        ring.current?.classList.add(
          "!w-14",
          "!h-14",
          "!border-coral",
          "!opacity-60",
        );
    };
    const onLeave = (e: Event) => {
      const target = (e.target as Element)?.closest?.(
        "a, button, .cursor-hover",
      );
      if (target)
        ring.current?.classList.remove(
          "!w-14",
          "!h-14",
          "!border-coral",
          "!opacity-60",
        );
    };

    document.body.addEventListener("mouseover", onEnter);
    document.body.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseover", onEnter);
      document.body.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="fixed top-0 left-0 w-6 h-6 border border-text-muted rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color,opacity] duration-300 mix-blend-difference hidden md:block"
      />
      <div
        ref={dot}
        className="fixed top-0 left-0 w-1 h-1 bg-coral rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
}
