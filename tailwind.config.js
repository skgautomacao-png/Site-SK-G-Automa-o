
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skg: {
          green: '#0a3622',
          red: '#ef4444'
        }
      }
    },
  },
  plugins: [],
}
