module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#00002B",
        secondary: "#F59E0B",
        light: "#AAAADD"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
