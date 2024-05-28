/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {"50":"#faf5ff","100":"#f3e8ff","200":"#e9d5ff","300":"#d8b4fe","400":"#c084fc","500":"#a855f7","600":"#9333ea","700":"#7e22ce","800":"#6b21a8","900":"#581c87","950":"#3b0764"}
      },
      keyframes: {
        honeycomb: {
          '0%, 20%, 80%, 100%': {
            opacity: '0',
            transform: 'scale(0)',
          },
          '30%, 70%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        honeycomb: 'honeycomb 2.1s infinite backwards',
      },
    },
  },
  plugins: [],
};
