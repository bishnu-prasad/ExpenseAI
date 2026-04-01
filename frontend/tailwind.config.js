/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        surface: '#ffffff',
        "surface-hover": '#f1f5f9',
        border: '#e2e8f0',
        primary: {
          DEFAULT: '#16a34a',
          hover: '#15803d',
          glow: 'rgba(22, 163, 74, 0.2)'
        },
        accent: {
          DEFAULT: '#22c55e',
          hover: '#16a34a'
        },
        slate: {
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50: '#f8fafc',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
