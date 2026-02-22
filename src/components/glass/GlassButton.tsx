import { type ReactNode } from "react";

interface GlassButtonProps {
  variant: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

export default function GlassButton({
  variant,
  href,
  onClick,
  target,
  rel,
  children,
  className = "",
  "aria-label": ariaLabel,
}: GlassButtonProps) {
  const baseClass = `glass-btn inline-flex items-center justify-center rounded-full px-6 py-3 min-h-[44px] min-w-[44px] glass-interactive ${className}`;
  const style =
    variant === "primary"
      ? { background: "rgba(255,255,255,0.55)" }
      : undefined;

  const effectiveRel = target === "_blank" ? rel || "noopener noreferrer" : rel;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={effectiveRel}
        aria-label={ariaLabel}
        className={baseClass}
        style={style}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={baseClass}
      style={style}
    >
      {children}
    </button>
  );
}
