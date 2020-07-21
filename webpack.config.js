const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  entry: {
    index: path.join(__dirname, "/src/index.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css"],
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000",
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, "/src/index.html"),
    }),
  ],
  devtool: "inline-source-map",
};
