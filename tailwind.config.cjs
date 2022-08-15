/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hall-screen': 'url("/hall-screen.svg")',
      },
    },
  },
  plugins: [],
}
