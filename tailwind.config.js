/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/src/assets/img/hero-pattern.svg')",
        "footer-texture": "url('/src/assets/img/footer-texture.png')",
        "clamaroj-bg": "url('/src/assets/img/logos/clamaroj-bg.jpg')",
      },
    },
  },
  plugins: [],
};
