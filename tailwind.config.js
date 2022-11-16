module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
      colors: {
        resBlue: "#313bf5",
      },
    },
  },
  variants: {},
  plugins: [require("tw-elements/dist/plugin"), require("flowbite/plugin")],
};
