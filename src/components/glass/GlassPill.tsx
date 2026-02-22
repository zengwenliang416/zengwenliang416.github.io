import { type ReactNode } from "react";

interface GlassPillProps {
  children: ReactNode;
  accent?: string;
  className?: string;
}

export default function GlassPill({
  children,
  accent,
  className = "",
}: GlassPillProps) {
  return (
    <span
      className={`glass-pill inline-flex items-center px-4 py-1.5 rounded-full ${className}`}
      style={
        accent
          ? {
              background: `linear-gradient(135deg, ${accent}10, rgba(255,255,255,0.50))`,
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}
