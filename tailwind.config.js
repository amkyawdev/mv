/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium dark theme
        'dark-bg': '#000000',
        'dark-surface': '#0a0a0a',
        'dark-border': '#1a1a1a',
        'dark-text': '#e0e0e0',
        
        // Neon blue accent
        'neon-blue': '#00d9ff',
        'neon-blue-dark': '#0099cc',
        
        // Soft gold accent
        'soft-gold': '#ffd700',
        'soft-gold-dark': '#cc9900',
        
        // Utility colors
        'glass-white': 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui'],
        body: ['var(--font-body)', 'system-ui'],
      },
      backdropBlur: {
        glass: '10px',
        'glass-lg': '20px',
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 217, 255, 0.3)',
        'neon-gold': '0 0 20px rgba(255, 215, 0, 0.2)',
        'glow-blue': '0 0 40px rgba(0, 217, 255, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 217, 255, 0.6)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [require('tailwindcss/plugin')],
};
