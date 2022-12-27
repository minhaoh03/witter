/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/weets/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'fira': ['Fira Sans', 'sans-serif'],
      },
      spacing: {
        '136': '34rem',
      }
    },
    minWidth: {
      '12': '12px',
    },
    
  },
  plugins: [],
}
