/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Design Tokens
        midnight: '#0B0B0C',
        'midnight-surface': '#121214',
        'midnight-raised': '#17171A',
        'midnight-alt': '#0F0F11',
        crimson: {
          DEFAULT: '#E50914',
          hover: '#CC0813',
          bright: '#FF2A36',
          dark: '#8B0000',
          tint: 'rgba(229, 9, 20, 0.12)',
        },
        lime: {
          DEFAULT: '#E50914',
          hover: '#CC0813',
          tint: 'rgba(229, 9, 20, 0.12)',
        },
        white: '#FFFFFF',
        muted: 'rgba(255, 255, 255, 0.62)',
        border: 'rgba(255, 255, 255, 0.08)',
        'border-subtle': 'rgba(255, 255, 255, 0.08)',
        'border-alt': 'rgba(255, 255, 255, 0.06)',
      },
      textColor: {
        white: '#FFFFFF',
        muted: 'rgba(255, 255, 255, 0.62)',
        crimson: '#E50914',
        'crimson-bright': '#FF2A36',
        lime: '#E50914',
      },
      borderColor: {
        DEFAULT: 'rgba(255, 255, 255, 0.08)',
        subtle: 'rgba(255, 255, 255, 0.08)',
        alt: 'rgba(255, 255, 255, 0.06)',
        crimson: '#E50914',
        lime: '#E50914',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'crimson-glow': '0 0 35px rgba(229, 9, 20, 0.35)',
        'crimson-glow-lg': '0 0 60px rgba(229, 9, 20, 0.50)',
        'lime-glow': '0 0 35px rgba(229, 9, 20, 0.35)',
        'lime-glow-lg': '0 0 60px rgba(229, 9, 20, 0.50)',
        'nav-shadow': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'card-soft': '0 4px 20px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'card-hover': '0 16px 36px -8px rgba(0, 0, 0, 0.8), 0 0 35px rgba(229, 9, 20, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
