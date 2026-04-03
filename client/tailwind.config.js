/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body:    ['Manrope', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      colors: {
        accent:  '#7c6af7',
        accent2: '#f06595',
        dark: {
          bg:   '#0a0a0f',
          bg2:  '#111118',
          bg3:  '#1a1a24',
          card: '#14141e',
        },
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'pulse-slow':  'pulse 4s ease-in-out infinite',
        'spin-slow':   'spin 20s linear infinite',
        'gradient':    'gradient 8s ease infinite',
        'typewriter':  'typewriter 2s steps(40) forwards',
        'blink':       'blink 1s step-end infinite',
        'slide-up':    'slideUp 0.6s ease forwards',
        'fade-in':     'fadeIn 0.8s ease forwards',
        'glow':        'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float:      { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        gradient:   { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        slideUp:    { from: { opacity: 0, transform: 'translateY(40px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:     { from: { opacity: 0 }, to: { opacity: 1 } },
        glow:       { from: { boxShadow: '0 0 20px rgba(124,106,247,0.3)' }, to: { boxShadow: '0 0 40px rgba(124,106,247,0.7)' } },
        blink:      { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
      },
      backgroundSize: { '300%': '300%' },
    },
  },
  plugins: [],
}
