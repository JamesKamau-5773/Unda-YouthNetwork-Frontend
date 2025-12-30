/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'unda-navy': '#1A2E35', // Trustworthy base
        'unda-teal': '#2D707E', // Primary brand color
        'unda-orange': '#FF7D45', // Vibrant CTA accent
        'unda-yellow': '#FFC83D', // Energy/Thriving accent
        'unda-bg': '#F9FAFB', // Neutral background
      },
    },
  },
  plugins: [],
};
