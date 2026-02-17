/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand (Neon System Green)
        neon: {
          DEFAULT: '#C6FF1A',
          bright: '#D8FF4D',
          soft: '#A6E80F',
          dark: '#7FB800',
        },
        // Core Industrial Backgrounds
        industrial: {
          black: '#0B0F0C',
          dark: '#111714',
          surface: '#161C19',
          elevated: '#1C2320',
        },
        // Neutral Technical Grays
        gray: {
          text: '#E6F1EA',
          secondary: '#A8B3AC',
          muted: '#6F7A73',
          border: '#2A332E',
          divider: '#222A26',
        },
        // Functional Colors
        success: '#3DFF7A',
        warning: '#FFE66D',
        error: '#FF5A5A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-in',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(198, 255, 26, 0.4)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(198, 255, 26, 0.8)',
          },
        },
        'slide-up': {
          '0%': { 
            transform: 'translateY(20px)',
            opacity: '0',
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
