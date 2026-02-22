import { useRef, ReactNode, MouseEvent } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  as?: "a" | "button" | "div";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = "",
  as: Tag = "div",
  href,
  target,
  rel,
  onClick,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const props = {
    ref: ref as any,
    className: `transition-transform duration-300 ${className}`,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    ...(href
      ? {
          href,
          target,
          rel: target === "_blank" ? rel || "noopener noreferrer" : rel,
        }
      : {}),
    ...(onClick ? { onClick } : {}),
  };

  return <Tag {...props}>{children}</Tag>;
}
