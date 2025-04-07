/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#242A32",
        secondary: "#151312",
        selected: "#0296E5",

        light: {
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#9CA4AB",
        },
        dark: {
          100: "#221F3D",
          200: "#0F0D23",
        },
        accent: "#AB8BFF",
      },
    },
  },
  plugins: [],
};