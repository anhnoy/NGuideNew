/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "NotoSansKR-Regular": ["Noto Sans KR", "sans-serif"],
        "NotoSansKR-Bold": ["Noto Sans KR Bold", "sans-serif"],
        "NotoSansKR-Medium": ["Noto Sans KR Medium", "sans-serif"],
      },
      colors: {
        main: "#FF9900",
        sub: "#6EBC30",
        btn: "#132D5C",
        header: "#6592E2",
        textmain: "#2F312A",
        textsub: "#132D5C",
      },
    },
  },
  plugins: [require("daisyui")],
};
