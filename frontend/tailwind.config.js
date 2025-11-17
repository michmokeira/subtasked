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
        'deep-purple': '#1e0e2a',
        'neon-orange': '#ff7b00',
        'muted-grey': '#b0a8b9',
      },
      fontFamily: {
        'creepster': ['Creepster', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'flicker': 'flicker 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px #ff7b00' },
          '50%': { boxShadow: '0 0 20px #ff7b00' },
        },
      },
    },
  },
  plugins: [],
}
