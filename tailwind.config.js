/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Roboto Serif", "serif"],
      },
      colors: {
        primary: {
          50: "#EEF5FC",
          100: "#D9E8F7",
          200: "#B2D0F0",
          300: "#8CB9E8",
          400: "#66A1E1",
          500: "#408BD9",
          600: "#256EBB",
          700: "#1C528C",
          800: "#13375E",
          900: "#091B2F",
          950: "#050F1A",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
