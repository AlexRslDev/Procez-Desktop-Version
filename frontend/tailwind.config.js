/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mid: '1085px',
      sm: '640px'
    },
    extend: {
      colors: {
        'black-50': 'rgba(0, 0, 0, 0.5)',
        'beige-hv': '#f5f5dc',
        'black-80': 'rgba(0, 0, 0, 0.8)'
      },
      width: {
        'max-full-input' : '350px',
        'full-input' : '300px',
        'medium--input' : '170px',
        'semi-medium-input' : '130px',
        'small-input' : '80px',
      },
      boxShadow: {
        'active': 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        'butom': 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      },
    },
  },
  plugins: [],
}

