const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    node: "current"
                  }
                }
              ],
              "@babel/preset-react"
            ],
            plugins: [
              [
                "@babel/plugin-proposal-decorators",
                {
                  legacy: true
                }
              ],
              [
                "@babel/plugin-proposal-class-properties",
                {
                  loose: true
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        loader: "file-loader?name=/fonts/[name].[ext]"
      },
      {
        test: /\.(png)$/,
        loader: "file-loader?name=/images/[name].[ext]"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["build"]),
    new HtmlWebPackPlugin({
      favicon: "./public/favicon.ico",
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new Dotenv()
  ]
};
