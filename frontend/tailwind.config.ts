import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mint: {
          50: "#E6F7F1",
          100: "#CDEFE3",
          200: "#B3E7D5",
          300: "#99DFC7",
          400: "#80D7B9",
          500: "var(--mint)", // Main color
          600: "#4DBF9D",
          700: "#33B78F",
          800: "#1AAF81",
          900: "#009773",
        },
        white: "var(--white)",
        charcoal: {
          50: "#6181A8",
          100: "#57779E",
          200: "#486384",
          300: "#415976",
          400: "#3A4F69",
          500: "var(--charcoal)", // Main color
          600: "#2B3B4F",
          700: "#243242",
          800: "#1D2835",
          900: "#161E27",
        },
        moonstone: {
          50: "#91D6DE",
          100: "#81D1D9",
          200: "#72CBD5",
          300: "#62C5D0",
          400: "#52BFCB",
          500: "var(--moonstone)", // Main color
          600: "#38AFBC",
          700: "#34A1AD",
          800: "#2F929D",
          900: "#2A838D",
        },
        davysGray: "var(--davys-gray)",
        error: "var(--error)",
        warning: "var(--warning)",
        success: "var(--success)",
      },
    },
  },
  plugins: [],
} satisfies Config;
