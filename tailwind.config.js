/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
      large: "12px",
      xxl: "3rem",
    },
    extend: {
      colors: {
        primaryColor: "#2c6ff2",
        hoverPrimaryColor: "#0B3C9C",
        textPrimaryColor: "#062259",
        darkBlue: "#041536",
        yellowColor: "#e4aa09",
        grayColor: "#ffffff4d",
        borderColor: "#d9d9d9",
        blockColor: "#252028",
        overlayColor: "#EEEEEE",
      },
    },
  },
  plugins: [],
};
