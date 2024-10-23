/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/templates/*.html"],
  theme: {
    daisyui: {
      themes: ["light", "dark", "cupcake"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
