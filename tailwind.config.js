/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bella: {
          red: '#8B0000',
          green: '#556B2F',
          gold: '#C9A227',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Crimson Pro', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
