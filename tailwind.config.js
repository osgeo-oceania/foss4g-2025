import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./content/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        display: ["var(--font-roboto-serif)", "serif"],
        sans: ["var(--font-open-sans)", "sans-serif"],
      },
      lineHeight: {
        "extra-loose": "2.5",
        24: "6rem",
        12: "3rem",
      },
    },
    colors: {
      ...colors,

      primary: {
        base: "#1B324F",
        50: "#E1EAF5",
        100: "#C2D4EA",
        200: "#85A9D5",
        300: "#497FC1",
        400: "#305A8D",
        500: "#1B324F",
        600: "#162941",
        700: "#101D2E",
        800: "#0A131E",
        900: "#050A0F",
        950: "#030508",
      },
      secondary: {
        base: "#E5744D",
        50: "#FCF1ED",
        100: "#FAE3DB",
        200: "#F5C7B8",
        300: "#EFAB94",
        400: "#EA8F71",
        500: "#E5744D",
        600: "#D64D1F",
        700: "#A03A17",
        800: "#6B2610",
        900: "#351308",
        950: "#1B0A04",
      },
      accent: {
        base: "#6EE2CF",
        50: "#F2FCFB",
        100: "#E1F9F5",
        200: "#C3F3EB",
        300: "#AAEEE3",
        400: "#8CE8D9",
        500: "#6EE2CF",
        600: "#37D7BC",
        700: "#22AA93",
        800: "#166F60",
        900: "#0B3730",
        950: "#061E1A",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
