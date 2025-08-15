const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#02325a',
        accent: '#9333ea',
        text: '#111827',
        blue: colors.blue,
        gray: colors.gray,
        yellow: colors.yellow,
      },
    },
  },
  plugins: [],
  future: {
    // 👇 This disables Tailwind's newer color formats (like oklch)
    useLegacyColorPalette: true,
  },
};
