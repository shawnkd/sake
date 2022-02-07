module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#283138',
        'new-green': '#7997a1'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
