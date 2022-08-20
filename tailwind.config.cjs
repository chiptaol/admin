/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hall-screen': 'url("/hall-screen.svg")',
      },
      fontFamily: {
        sans: ['"Cera Pro"', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['"Cera Pro"', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['"Cera Pro"', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
