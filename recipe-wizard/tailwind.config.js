/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette for your recipe app
        recipe: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        culinary: {
          green: "#22c55e",
          yellow: "#eab308",
          orange: "#f97316",
          red: "#ef4444",
          purple: "#8b5cf6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-playfair-display)", "Playfair Display", "serif"],
        mono: ["var(--font-roboto-mono)", "Roboto Mono", "monospace"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        recipe:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "recipe-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "recipe-pattern": "url('/patterns/cooking-pattern.png')",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "bounce-slow": "bounce 2s infinite",
        // New animations defined in globals.css
        "steam-1": "steam1 3s infinite ease-in-out",
        "steam-2": "steam2 2.7s infinite ease-in-out",
        "steam-3": "steam3 3.3s infinite ease-in-out",
        "bubble-1": "bubble1 1.5s infinite ease-in-out",
        "bubble-2": "bubble2 2s infinite ease-in-out",
        "bubble-3": "bubble3 1.7s infinite ease-in-out",
      },
    },
  },
  plugins: [forms, typography],
};

export default config;
