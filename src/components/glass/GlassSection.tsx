import { type ReactNode } from "react";

interface GlassSectionProps {
  children: ReactNode;
  fullWidth?: boolean;
  preset?: "cta" | "marquee";
  className?: string;
}

export default function GlassSection({
  children,
  fullWidth,
  preset = "cta",
  className = "",
}: GlassSectionProps) {
  const radius = fullWidth ? "" : "rounded-3xl";
  const marqueeStyle =
    preset === "marquee" ? { background: "rgba(255,255,255,0.35)" } : undefined;

  return (
    <div
      className={`glass-card ${radius} ${fullWidth ? "w-full" : ""} ${className}`}
      style={marqueeStyle}
    >
      {children}
    </div>
  );
}
