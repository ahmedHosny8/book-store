/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          200: "#dab26d", // درجة اللون البني
        },

        "brand-primary": "#4a57c8",
        "brand-primary-darker": "#3b46a0",
        "brand-secondary": "#895c44",
        "brand-grey-lighter": "#f9fafb",
        "brand-grey": "#eeeeed",
        "brand-black": "#21221d",
      },

      fontFamily: {
        poppins: "'Poppins', sans-serif",
      },
    },
    screens: {
      sm: "450px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  extend: {},

  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
