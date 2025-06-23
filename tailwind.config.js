/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        secondary: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
          950: "#4a044e",
        },
        accent: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        dark: {
          100: "#1E1E1E",
          200: "#2D2D2D",
          300: "#3C3C3C",
          400: "#4B4B4B",
          500: "#5A5A5A",
        },
        light: {
          100: "#FFFFFF",
          200: "#F5F5F5",
          300: "#E5E5E5",
          400: "#D4D4D4",
          500: "#C4C4C4",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Raleway", "sans-serif"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      animation: {
        gradient: "gradient 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": {transform: "translateY(0)"},
          "50%": {transform: "translateY(-10px)"},
        },
        gradient: {
          "0%": {backgroundPosition: "0% 50%"},
          "50%": {backgroundPosition: "100% 50%"},
          "100%": {backgroundPosition: "0% 50%"},
        },
      },
      cursor: {
        default: "url(/cursor.svg), auto",
      },
    },
  },
  plugins: [],
};
