/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        'bebas': ['Bebas Neue', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
      },
      colors: {
        'sky-blue': '#0EA5E9',
        'navy-blue': '#001F3F',
        'cyan-glow': '#06B6D4',
        'slate-dark': '#0F172A',
        'slate-light': '#F8FAFC',
        primary: '#0EA5E9',
        secondary: '#001F3F',
      },
      backdropBlur: {
        md: '12px',
        lg: '16px',
        xl: '20px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(14, 165, 233, 0.5)',
        'glow-lg': '0 0 40px rgba(14, 165, 233, 0.6)',
        'soft': '0 10px 30px rgba(0, 31, 63, 0.1)',
        'soft-lg': '0 20px 50px rgba(0, 31, 63, 0.15)',
        'dark': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0EA5E9 0%, #001F3F 100%)',
        'gradient-cyber': 'linear-gradient(45deg, #0EA5E9, #06B6D4, #001F3F)',
        'gradient-premium': 'linear-gradient(to right, #0EA5E9, #0284C7)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(14, 165, 233, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};
