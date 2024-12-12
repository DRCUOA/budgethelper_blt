/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: 'rgb(255,69,0)',
        dark: {
          DEFAULT: '#000000',
          surface: '#121212',
          card: '#1E1E1E',
          border: '#2E2E2E'
        }
      }
    },
  },
  plugins: [],
}