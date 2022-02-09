module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#2e3a48',
        'new-green': '#7997a1',
        'gg': '#283138',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
