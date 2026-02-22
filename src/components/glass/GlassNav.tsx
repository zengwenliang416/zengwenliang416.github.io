import { type ReactNode } from "react";

interface GlassNavProps {
  scrolled: boolean;
  children: ReactNode;
}

export default function GlassNav({ scrolled, children }: GlassNavProps) {
  return (
    <nav
      className={`glass-nav fixed top-0 left-0 right-0 z-50 w-full ${scrolled ? "glass-nav--scrolled" : ""}`}
    >
      {children}
    </nav>
  );
}
