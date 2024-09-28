import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        flash: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
      animation: {
        flash: "flash 0.5s ease-in-out",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: "#3A7DFF",
            secondary: "#4299E1",
            background: "#101214",
            content1: "#1c2228",
            content2: "#2a313a",
            textcontent1: "#b0bec5",
            default: {
              100: "#2a313a",
              200: "#3f4957",
            },
            success: "#00caa7",
          },
        },
      },
    }),
  ],
};

