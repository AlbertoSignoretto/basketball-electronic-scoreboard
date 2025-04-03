/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",         // Tutti gli HTML nella root
    "./src/**/*.{js,html}", // Qualsiasi JS o HTML dentro /src
  ],
  theme: {
    extend: {
      fontFamily: {
        'seven-segment': ['"Seven Segment"', 'monospace'],
      },
      fontSize: {
        '10xl': '12rem',
        '11xl': '14rem',
        '12xl': '16rem',
      }

    },
  },
  plugins: [],
}