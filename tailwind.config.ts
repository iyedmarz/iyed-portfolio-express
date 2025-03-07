
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FF3E4D", // Racing red
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1E293B", // Dark blue-gray
          foreground: "#ffffff",
        },
        purple: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
          950: "#2E1065",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#030712",
        },
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-slow": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "rev-up": {
          "0%": { transform: "scale(0.9) rotate(-3deg)" },
          "100%": { transform: "scale(1) rotate(0)" },
        },
        "speedometer": {
          "0%": { transform: "rotate(-120deg)" },
          "100%": { transform: "rotate(120deg)" },
        },
        "drift-left": {
          "0%": { transform: "translateX(0) rotate(0)" },
          "50%": { transform: "translateX(-10px) rotate(-2deg)" },
          "100%": { transform: "translateX(0) rotate(0)" },
        },
        "drift-right": {
          "0%": { transform: "translateX(0) rotate(0)" },
          "50%": { transform: "translateX(10px) rotate(2deg)" },
          "100%": { transform: "translateX(0) rotate(0)" },
        },
        "rev-light": {
          "0%": { opacity: "0.5", transform: "scale(0.95)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "100%": { opacity: "0.5", transform: "scale(0.95)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "robot-wave": {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(15deg)" },
          "75%": { transform: "rotate(-15deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "hover-bot": {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(139, 92, 246, 0)" },
          "50%": { boxShadow: "0 0 10px 2px rgba(139, 92, 246, 0.3)" },
        }
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-slow": "fade-in-slow 0.8s ease-out",
        "slide-in": "slide-in 0.6s ease-out",
        "rev-up": "rev-up 0.4s ease-out",
        "speedometer": "speedometer 2s ease-in-out infinite alternate",
        "drift-left": "drift-left 2s ease-in-out infinite",
        "drift-right": "drift-right 2s ease-in-out infinite",
        "rev-light": "rev-light 2s ease-in-out infinite",
        "spin-slow": "spin-slow 3s linear infinite",
        "robot-wave": "robot-wave 2s ease-in-out infinite",
        "hover-bot": "hover-bot 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
