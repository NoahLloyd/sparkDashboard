module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        primaryTransparent: "var(--primary-transparent)",
        secondary: "var(--secondary)",
        secondaryDark: "var(--secondary-dark)",
        secondaryTransparent: "var(--secondary-transparent)",
        secondaryTransparent2: "var(--secondary-transparent2)",
        light: "var(--light)"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
