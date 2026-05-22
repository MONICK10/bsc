/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'sky-blue': '#0EA5E9',
        'navy-blue': '#001F3F',
        primary: '#0EA5E9',
        secondary: '#001F3F',
      },
      backdropBlur: {
        md: '12px',
      },
    },
  },
  plugins: [],
};
