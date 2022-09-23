/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#e3582d",
          light: "#ff8959",
          dark: "#aa2500",
        },
        onPrimary: "#000000",
        secondary: {
          DEFAULT: "#0e2e47",
          light: "#3c5773",
          dark: "#000320",
        },
        onSecondary: "#ffffff",
      },
    },
  },
  plugins: [],
};
