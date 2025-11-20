/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: false,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
        archivo: ["Archivo", "ui-sans-serif", "system-ui", "sans-serif"],
        bricolage: ["Bricolage Grotesque", "sans-serif"],
        degular: ["Degular Display Demo", "sans-serif"],
      },
      colors: {
        pageBg: "#fbfbfa",
      },
    },
  },
  plugins: [],
};

export default config;
