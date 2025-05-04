const { withUI } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = withUI({
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
});