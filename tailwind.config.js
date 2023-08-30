/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'md': 'inset 0px 0px 15px 20px rgba(63, 63, 63, 1)'
      },
      keyframes: {
        'animeModal': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-50px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'animeBtn': {
          '0%, 100%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(.8)'
          }
        },
        'animeCartBtn': {
          '0%, 100%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(0.7)'
          }
        },
      },
      animation: {
        'animeModal': 'animeModal .3s ease-in-out',
        'animeBtn': 'animeBtn .1s ease-in-out',
        'animeCartBtn': 'animeCartBtn .3s ease-in-out'
      }
    },
  },
  plugins: [],
}
