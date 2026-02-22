import { useEffect, useRef, useCallback } from "react";

interface Props {
  texts: string[];
  className?: string;
}

const CHARS = "!<>-_\\/[]{}—=+*^?#________";
const SCRAMBLE_COLOR = "#FF3C5F";

export default function TextScramble({ texts, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<HTMLSpanElement[]>([]);

  const ensureNodes = useCallback(
    (count: number, container: HTMLSpanElement) => {
      const existing = nodesRef.current;
      while (existing.length < count) {
        const span = document.createElement("span");
        container.appendChild(span);
        existing.push(span);
      }
      while (existing.length > count) {
        const removed = existing.pop()!;
        removed.remove();
      }
    },
    [],
  );

  const scramble = useCallback(
    (newText: string) => {
      const el = ref.current;
      if (!el) return;
      const oldText = el.textContent || "";
      const length = Math.max(oldText.length, newText.length);
      const queue: {
        from: string;
        to: string;
        start: number;
        end: number;
        char?: string;
      }[] = [];

      for (let i = 0; i < length; i++) {
        queue.push({
          from: oldText[i] || "",
          to: newText[i] || "",
          start: Math.floor(Math.random() * 40),
          end: Math.floor(Math.random() * 40) + Math.floor(Math.random() * 40),
        });
      }

      ensureNodes(length, el);
      frameRef.current = 0;
      cancelAnimationFrame(rafRef.current);

      const update = () => {
        let complete = 0;
        for (let i = 0; i < queue.length; i++) {
          const q = queue[i];
          const node = nodesRef.current[i];
          if (!node) continue;

          if (frameRef.current >= q.end) {
            complete++;
            node.textContent = q.to;
            node.style.color = "";
            node.style.opacity = "";
          } else if (frameRef.current >= q.start) {
            if (!q.char || Math.random() < 0.28) {
              q.char = CHARS[Math.floor(Math.random() * CHARS.length)];
            }
            node.textContent = q.char;
            node.style.color = SCRAMBLE_COLOR;
            node.style.opacity = "0.6";
          } else {
            node.textContent = q.from;
            node.style.color = "";
            node.style.opacity = "";
          }
        }
        if (complete < queue.length) {
          frameRef.current++;
          rafRef.current = requestAnimationFrame(update);
        }
      };
      update();
    },
    [ensureNodes],
  );

  useEffect(() => {
    const cycle = () => {
      scramble(texts[indexRef.current]);
      indexRef.current = (indexRef.current + 1) % texts.length;
    };
    const id = setInterval(cycle, 3000);
    const init = setTimeout(cycle, 800);
    return () => {
      clearInterval(id);
      clearTimeout(init);
      cancelAnimationFrame(rafRef.current);
    };
  }, [texts, scramble]);

  return <span ref={ref} className={className} />;
}
