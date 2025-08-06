/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "sans": ["Noto Sans KR", "system-ui", "sans-serif"],
      },
      colors: {
        main: "#FF9900",
        sub: "#6EBC30",
        btn: "#132D5C",
        header: "#6592E2",
        textmain: "#2F312A",
        textsub: "#132D5C",
        border: "#e5e7eb",
        background: "#ffffff",
        foreground: "#111827",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
