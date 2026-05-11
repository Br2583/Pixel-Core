/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        background: '#F5F4F2',
        foreground: '#1A1918',
        primary: {
          DEFAULT: '#DC2626',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#ECEBE7',
          foreground: '#1A1918',
        },
        muted: {
          DEFAULT: '#C4C0B8',
          foreground: '#6B6560',
        },
        accent: {
          DEFAULT: '#ECEBE7',
          foreground: '#1A1918',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1918',
        },
        border: '#DDD9D3',
        input: '#DDD9D3',
        ring: '#DC2626',
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      animation: {
        'fade-in':       'fadeIn .5s ease forwards',
        'slide-up':      'slideUp .5s ease forwards',
        'float':         'float 3s ease-in-out infinite',
        'blink':         'blink 4s ease-in-out infinite',
        'marquee':       'marquee 40s linear infinite',
        'marquee-fast':  'marquee 25s linear infinite',
        'text-scroll':   'textScroll 20s linear infinite',
        'grid-scroll':   'gridScroll 8s linear infinite',
        'spin-slow':     'spin 12s linear infinite',
        'page-enter':    'pageEnter .5s ease forwards',
        'ken-burns-1':   'kenBurns1 20s ease-in-out infinite alternate',
        'ken-burns-2':   'kenBurns2 20s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        blink: {
          '0%, 88%, 100%': { opacity: '1' },
          '92%':           { opacity: '0' },
        },
        marquee: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        textScroll: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gridScroll: {
          '0%':   { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(60px)' },
        },
        pageEnter: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        kenBurns1: {
          '0%':   { transform: 'scale(1.0) translate(0%, 0%)' },
          '100%': { transform: 'scale(1.12) translate(-2%, -1%)' },
        },
        kenBurns2: {
          '0%':   { transform: 'scale(1.12) translate(2%, 1%)' },
          '100%': { transform: 'scale(1.0) translate(0%, 0%)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
