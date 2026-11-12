/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2196F3',
        secondary: '#FFFFFF',
        surface: '#F5F9FF',
        accent: '#1565C0',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 30px rgba(21, 101, 192, 0.08)',
        soft: '0 4px 16px rgba(33, 150, 243, 0.12)',
      },
    },
  },
  plugins: [],
};
