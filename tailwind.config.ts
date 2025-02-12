
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
        }
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-slow": "fade-in-slow 0.8s ease-out",
        "slide-in": "slide-in 0.6s ease-out",
        "rev-up": "rev-up 0.4s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
