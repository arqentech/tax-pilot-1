/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: false,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
      },
      colors: {
        pageBg: "#fbfbfa",
      },
    },
  },
  plugins: [],
};

export default config;
