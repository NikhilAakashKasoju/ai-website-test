import type { Config } from "tailwindcss";

// Design tokens for the Agentic AI Bootcamp page.
// If you have the real edufulness.com/dsa brand colors/fonts, swap the
// values below — everything in the page pulls from this single source.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#0B0E17", // page background — soft navy-black, not pure black
        surface: "#131826", // card background
        "surface-hover": "#1A2233",
        border: {
          subtle: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.16)",
        },
        ink: {
          DEFAULT: "#F4F5F7",
          secondary: "#A3ACC2",
          muted: "#6B7280",
        },
        violet: {
          DEFAULT: "#7C6CF6",
          soft: "#8F82FF",
        },
        cyan: {
          DEFAULT: "#4CD9E8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "agent-gradient": "linear-gradient(135deg, #7C6CF6 0%, #4CD9E8 100%)",
        "agent-gradient-soft":
          "linear-gradient(135deg, rgba(124,108,246,0.16) 0%, rgba(76,217,232,0.10) 100%)",
        "radial-glow":
          "radial-gradient(60% 50% at 50% 0%, rgba(124,108,246,0.26) 0%, rgba(11,14,23,0) 70%)",
        "dot-grid":
          "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-grid": "26px 26px",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(124,108,246,0.45)",
        "glow-cyan": "0 0 60px -12px rgba(76,217,232,0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        orbit: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.9" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "50%": { transform: "translate(24px, -18px)" },
        },
        floatSlowReverse: {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "50%": { transform: "translate(-20px, 22px)" },
        },
      },
      animation: {
        "pulse-slow": "pulseSlow 3.2s ease-in-out infinite",
        orbit: "orbit 18s linear infinite",
        twinkle: "twinkle 3.5s ease-in-out infinite",
        "float-slow": "floatSlow 14s ease-in-out infinite",
        "float-slow-reverse": "floatSlowReverse 16s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
