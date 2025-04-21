/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'IBM Plex Mono', 'monospace'],
      },
      colors: {
        'theme': 'var(--theme-color)',
        'theme-light': 'var(--theme-color-light)',
        'light': {
          100: 'var(--light-100)',
          200: 'var(--light-200)',
          300: 'var(--light-300)',
          400: 'var(--light-400)',
          500: 'var(--light-500)',
          600: 'var(--light-600)',
        },
        'dark': {
          100: 'var(--dark-100)',
          200: 'var(--dark-200)',
          300: 'var(--dark-300)',
          400: 'var(--dark-400)',
          500: 'var(--dark-500)',
          600: 'var(--dark-600)',
        },
      },
      backgroundColor: {
        'primary': 'var(--bg-primary)',
        'secondary': 'var(--bg-secondary)',
        'accent': 'var(--accent-bg)',
      },
      textColor: {
        'primary': 'var(--text-primary)',
        'secondary': 'var(--text-secondary)',
        'accent': 'var(--accent-text)',
      },
    },
  },
  plugins: [],
}
