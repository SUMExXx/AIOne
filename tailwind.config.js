/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx,html}'
  ],
  // darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // light: `#444746`,
        // DEFAULT: `#444746`,
        // dark: `#202123`,
        ui: {
          light: `#323233`,
          DEFAULT: `#323233`,
          dark: `#8E8E8E`
        },
        uiHover: {
          light: `#E5E5E5`,
          DEFAULT: `#E5E5E5`,
          dark: `#323233`
        },
        background: {
          light: `#FFFFFF`,
          DEFAULT: `#FFFFFF`,
          dark: `#202123`
        },
        buttonRing: {
          light: `#8E8E8E`,
          DEFAULT: `#8E8E8E`,
          dark: `#8E8E8E`
        },
        text: {
          light: `#323233`,
          DEFAULT: `#323233`,
          dark: `#FFFFFF`
        },
        customLightGrey: {
          light: `#444746`,
          DEFAULT: `#8E8E8E`,
          dark: `#8E8E8E`
        },
        customMediumGrey: {
          light: `#FFFFFF`,
          DEFAULT: `#4D4D4E`,
          dark: `#4D4D4E`
        },
        customDarkGrey: {
          light: `#FFFFFF`,
          DEFAULT: `#323233`,
          dark: `#323233`
        },
        customBlue: {
          light: `#323233`,
          DEFAULT: `#0066DE`,
          dark: `#323233`
        },
        customDarkGrey3: {
          light: `#323233`,
          DEFAULT: `#1E1E1E`,
          dark: `#323233`
        },
      },
    },
  },
  plugins: [],
}

