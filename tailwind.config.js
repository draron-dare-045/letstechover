/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0E17',
        surface: '#121826',
        surfaceAlt: '#1B2333',
        border: '#242D40',
        text: '#E7EAF2',
        muted: '#8891A7',
        accent1: '#7C6CFF',
        accent2: '#22D3C9',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(#242D40 1px, transparent 1px), linear-gradient(90deg, #242D40 1px, transparent 1px)',
        'brand-gradient': 'linear-gradient(135deg, #7C6CFF 0%, #22D3C9 100%)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
    },
  },
  plugins: [],
}
