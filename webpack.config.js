const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ["./src/scripts/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/manifest.json" },
        { from: "./src/styles/index.css" },
        {
          from: "icons/*",
          to: path.resolve(__dirname, "dist"),
          context: "src/",
        },
      ],
    }),
  ],
};
