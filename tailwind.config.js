/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{vue,js}',
    './components/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#222222',
        primary: '#296BFF',
        grey: '#9e9e9e',
        'dark-grey': '#6A6A6A',
        'dark-grey-1': '#6C757D',
      },
      boxShadow: {
        200: '0px 0px 20px 0px rgba(0,0,0,0.1)',
        300: '6px 6px 54px 0px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
