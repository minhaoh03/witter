/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/weets/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'fira': ['Fira Sans', 'sans-serif'],
        'ubuntu': ['Ubuntu', 'sans-serif'],
      },
      spacing: {
        '136': '34rem',
        
      },
      width: {
        '270px': '270px',
      }
    },
    minWidth: {
      '12': '12px',
      '270px': '270px',
    },
    maxWidth: {
      '1/3': '33%',
    },
  },
  plugins: [],
}
