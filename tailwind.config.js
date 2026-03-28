/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6',
        background: '#050505',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'reveal': 'reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'float': 'float 25s infinite alternate ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        reveal: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%': { transform: 'translate(-15%, -15%) scale(1)' },
          '100%': { transform: 'translate(15%, 15%) scale(1.15)' },
        }
      }
    },
  },
  plugins: [],
}
