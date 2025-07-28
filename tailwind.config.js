/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Theme-aware colors using CSS variables
        primary: 'var(--theme-primary)',
        secondary: 'var(--theme-secondary)',
        background: 'var(--theme-background)',
        surface: 'var(--theme-surface)',
        text: 'var(--theme-text)',
        'text-secondary': 'var(--theme-text-secondary)',
        border: 'var(--theme-border)',
        success: 'var(--theme-success)',
        warning: 'var(--theme-warning)',
        error: 'var(--theme-error)',
        info: 'var(--theme-info)',
        
        // Light theme colors
        light: {
          primary: '#36BFFA',
          secondary: '#6366f1',
          background: '#ffffff',
          surface: '#f8fafc',
          text: '#1e293b',
          'text-secondary': '#64748b',
          border: '#e2e8f0',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6'
        },
        
        // Dark theme colors
        dark: {
          primary: '#36BFFA',
          secondary: '#818cf8',
          background: '#0f172a',
          surface: '#1e293b',
          text: '#f1f5f9',
          'text-secondary': '#94a3b8',
          border: '#334155',
          success: '#34d399',
          warning: '#fbbf24',
          error: '#f87171',
          info: '#60a5fa'
        },
        
        // Accessibility theme colors - Oq-Qora rejim
        accessibility: {
          primary: '#000000',
          secondary: '#000000',
          background: '#ffffff',
          surface: '#f0f0f0',
          text: '#000000',
          'text-secondary': '#000000',
          border: '#000000',
          success: '#000000',     // Barcha ranglar qora
          warning: '#000000',     // Barcha ranglar qora
          error: '#000000',       // Barcha ranglar qora
          info: '#000000'         // Barcha ranglar qora
        }
      },
      
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'cairo': ['Cairo', 'sans-serif'],
      },
      
      fontSize: {
        // Accessibility theme - larger font sizes
        'accessibility-xs': ['14px', '20px'],
        'accessibility-sm': ['16px', '24px'],
        'accessibility-base': ['18px', '28px'],
        'accessibility-lg': ['20px', '32px'],
        'accessibility-xl': ['24px', '36px'],
        'accessibility-2xl': ['28px', '40px'],
        'accessibility-3xl': ['32px', '44px'],
      }
    },
  },
  plugins: [
    // Custom plugin for theme variants
    function({ addVariant }) {
      addVariant('light', '.light &');
      addVariant('dark', '.dark &');
      addVariant('accessibility', '.accessibility &');
    }
  ],
}
