import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:         '#1E6EB5',
          'blue-dark':  '#155090',
          'blue-light': '#E8F1FB',
          green:        '#8DC63F',
          'green-dark': '#6BA02E',
          'green-light':'#F0F7E6',
          navy:         '#1A1A2E',
        },
        neutral: {
          50:  '#F8F9FA',
          100: '#F0F0F0',
          200: '#E0E0E0',
          600: '#555555',
          700: '#333333',
          900: '#111111',
        }
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
      },
      boxShadow: {
        'card':       '0 4px 24px rgba(0,0,0,0.07)',
        'card-hover': '0 8px 40px rgba(30,110,181,0.15)',
        'cta':        '0 8px 32px rgba(141,198,63,0.3)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'count-up': 'countUp 2s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
