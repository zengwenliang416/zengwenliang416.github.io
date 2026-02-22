import { type ReactNode } from "react";

interface GlassCardProps {
  variant: "featured" | "grid" | "publication";
  className?: string;
  children: ReactNode;
}

export default function GlassCard({
  variant,
  className = "",
  children,
}: GlassCardProps) {
  const radius = variant === "featured" ? "rounded-2xl" : "rounded-xl";

  return (
    <div className={`glass-card ${radius} overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
