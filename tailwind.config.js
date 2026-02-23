/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0A0A0C",
        "dark-surface": "#161618",
        "dark-card": "#1a1a1c",
        "dark-border": "rgba(255,255,255,0.08)",
        coral: "#FF3C5F",
        "coral-dim": "rgba(255,60,95,0.12)",
        lime: "#34C759",
        "lime-bright": "#c8ff00",
        "lime-dim": "rgba(52,199,89,0.10)",
        indigo: "#5856D6",
        "indigo-dim": "rgba(88,86,214,0.12)",
        "accent-dark": "#0D0D0F",
        "text-primary": "#E8E8ED",
        "text-secondary": "#9898A0",
        "text-muted": "#555560",
        "glass-fill": "rgba(255,255,255,0.04)",
        "glass-border": "rgba(255,255,255,0.08)",
        "border-strong": "rgba(255,255,255,0.15)",
        separator: "rgba(255,255,255,0.05)",
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans SC", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};
