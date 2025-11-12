/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        archivo: ["Archivo", "ui-sans-serif", "system-ui", "sans-serif"],
        bricolage: ["Bricolage Grotesque", "sans-serif"],
        degular: ["Degular Display Demo", "sans-serif"],
      },
      colors: {
        "page-bg": "#fbfbfa",
      },
    },
  },
  plugins: [],
};

export default config;
