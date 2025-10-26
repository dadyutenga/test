/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        twilight: '#0f172a',
        blush: '#f472b6',
        dusk: '#1e1b4b',
      },
    },
  },
  plugins: [],
};
