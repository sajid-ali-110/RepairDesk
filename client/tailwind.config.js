/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14b8a6", // Teal color from design
        secondary: "#0f766e",
        dark: "#1e293b",
      },
    },
  },
  plugins: [],
};
