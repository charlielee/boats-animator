import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";

const rootPath = path.resolve(__dirname, "..");

const config = {
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
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        // Should match src/@types/media.d.ts
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
  },
  output: {
    path: path.resolve(rootPath, "dist/renderer"),
    filename: "js/[name].js",
    publicPath: "./",
    globalObject: "this",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Boats Animator",
      template: "static/index.html",
    }),
  ],
};

export default config;
