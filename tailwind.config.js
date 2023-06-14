/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1F6AEC",
        grayText: "#6D7A98",
        bgGray:'#DEE3EB'
      },
    },
  },
  plugins: [],
};
