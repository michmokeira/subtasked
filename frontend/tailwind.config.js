/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jet-black': '#0a0a0a',
        'deep-purple': '#4a148c',
        'neon-orange': '#ff6f00',
        'muted-grey': '#757575',
      },
      fontFamily: {
        'creepster': ['Creepster', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
