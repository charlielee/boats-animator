import ESLintPlugin from "eslint-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import { Configuration } from "webpack";
// This import "augments" the Configuration interface from webpack
import "webpack-dev-server";

const rootPath = path.resolve(__dirname, "..");

const config: Configuration = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    mainFields: ["main", "module", "browser"],
  },
  entry: path.resolve(rootPath, "src/renderer", "index.tsx"),
  target: "web",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /(node_modules|\.test\.ts*)/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.ttf$/i,
        type: "asset/resource",
      },
      {
        // Should match src/types/media.d.ts
        test: /\.(jpg|png|svg|wav)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: path.join(rootPath, "dist/renderer"),
    devMiddleware: {
      publicPath: "/",
    },
    port: 4000,
    historyApiFallback: true,
    compress: true,
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },
  output: {
    path: path.resolve(rootPath, "dist/renderer"),
    filename: "js/[name].js",
    publicPath: "./",
    globalObject: "this",
  },
  plugins: [
    new ESLintPlugin({ extensions: ["ts", "tsx"] }),
    new HtmlWebpackPlugin({
      title: "Boats Animator",
      template: "static/index.html",
    }),
  ],
};

export default config;
