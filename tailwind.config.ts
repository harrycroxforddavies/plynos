import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plynos: {
          blue: "#0B5FFF",
          navy: "#0B1220",
          slate: "#5B6472",
          soft: "#EAF2FF",
          white: "#FFFFFF",
          teal: "#14B8A6",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-plus-jakarta)",
          "Plus Jakarta Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightish: "0",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11, 18, 32, 0.04), 0 8px 24px rgba(11, 18, 32, 0.04)",
        ring: "0 0 0 1px rgba(11, 95, 255, 0.18)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
      },
      maxWidth: {
        page: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
