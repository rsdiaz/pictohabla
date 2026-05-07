/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Paleta pastel suave y accesible
        soft: {
          bg: '#f7fafc',
          surface: '#ffffff',
          surface2: '#eef4f8',
          border: '#d9e2ec',
          text: '#1f2937',
          textSoft: '#4b5563',
        },
        brand: {
          DEFAULT: '#6FB1E0',
          soft: '#A7D8FF',
        },
        pastel: {
          blue: '#A7D8FF',
          pink: '#FFD8E4',
          green: '#C7E9B0',
          yellow: '#FFE5A0',
          purple: '#D5C6F0',
          peach: '#FFC9B5',
          mint: '#B5E2E2',
          sand: '#F0DCC4',
          danger: '#FFB3B3',
          success: '#B7E4C7',
        },
        dark: {
          bg: '#1f2733',
          surface: '#2a3340',
          surface2: '#323c4a',
          border: '#3e4a5a',
          text: '#f1f5f9',
          textSoft: '#cbd5e1',
        },
      },
      fontFamily: {
        sans: ['Segoe UI', 'system-ui', '-apple-system', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      boxShadow: {
        soft: '0 2px 6px rgba(0,0,0,0.06)',
        card: '0 6px 16px rgba(0,0,0,0.08)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%':       { transform: 'translateY(-22px) rotate(8deg)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%':       { transform: 'translateY(-14px) scale(1.04)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'loading-dot': {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: '0.5' },
          '40%':           { transform: 'scale(1)',   opacity: '1' },
        },
        'bounce-once': {
          '0%':   { transform: 'scale(0.6)', opacity: '0' },
          '60%':  { transform: 'scale(1.08)', opacity: '1' },
          '100%': { transform: 'scale(1)',   opacity: '1' },
        },
      },
      animation: {
        float:          'float 5s ease-in-out infinite',
        'bounce-soft':  'bounce-soft 2.4s ease-in-out infinite',
        'fade-up':      'fade-up 0.7s ease-out both',
        'loading-dot':  'loading-dot 1.2s ease-in-out infinite',
        'bounce-once':  'bounce-once 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
