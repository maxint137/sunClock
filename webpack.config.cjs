const path = require("path");

module.exports = {
  mode: "development", // or 'production'
  entry: "./out/sunclock.js",

  entry: {
    sunclock: "./out/sunclock.js",
    sunrise: "./out/sunrise-demo.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
