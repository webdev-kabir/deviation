/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Action colors
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          light: 'var(--color-primary-light)',
        },
        
        // Semantic colors - Status & Priority
        danger: {
          DEFAULT: 'var(--color-danger)',
          light: 'var(--color-danger-light)',
          border: 'var(--color-danger-border)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          light: 'var(--color-warning-light)',
          border: 'var(--color-warning-border)',
        },
        high: {
          DEFAULT: 'var(--color-high)',
          light: 'var(--color-high-light)',
          border: 'var(--color-high-border)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          light: 'var(--color-info-light)',
          border: 'var(--color-info-border)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          light: 'var(--color-success-light)',
          border: 'var(--color-success-border)',
        },
        
        // Backgrounds
        background: {
          DEFAULT: 'var(--color-background)',
          card: 'var(--color-background-card)',
          secondary: 'var(--color-background-secondary)',
        },
        
        // Text colors
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        
        // Borders
        border: {
          DEFAULT: 'var(--color-border)',
          light: 'var(--color-border-light)',
        },
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
