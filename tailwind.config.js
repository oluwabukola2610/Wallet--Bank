/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F6AEC",
        grayText: "#6D7A98",
        bgGray: "#DEE3EB",
        faded: "#F1F4F8",
      },
      screens:{
        "md":"700px"
      }
    },
  },
  plugins: [require("daisyui")],
};
