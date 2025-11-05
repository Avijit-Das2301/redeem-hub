/** @type {import("tailwindcss").Config} */

export default {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#f59e0b", // amber shade
          dark: "#b45309",
        },
      },
      boxShadow: {
        glass: "0 10px 30px rgba(2,6,23,0.08)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
};
