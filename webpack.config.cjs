const path = require("path");

module.exports = {
  mode: 'production',
  // mode: "development",
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
