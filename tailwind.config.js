/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B3A6B',
        secondary: '#F1EAF7',
        accent: '#FFD966',
        background: '#FFFFFF',
        text: '#222222',
        gold: {
          400: '#FFD966',
          500: '#FFD700',
        },
      },
      fontFamily: {
        title: ['Montserrat', 'Lora', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Open Sans', 'Montserrat', 'system-ui', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive'],
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
} 