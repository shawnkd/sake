module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#04052E',
        'new-green': '#6367f2',
        'gg': '#22007c',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
