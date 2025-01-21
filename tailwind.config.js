/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Bungee: ["Bungee Shade", "serif"],
        Robin: ["Noto Sans", "serif"],
        Notion: ["Jost", "serif"],
      },
      colors: {
        Robin: "#191919;",
        Robin2: "#212020",
        Robin3: "#383636",
      },
    },
  },
  plugins: [],
};
