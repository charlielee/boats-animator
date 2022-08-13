import ESLintPlugin from "eslint-webpack-plugin";
import * as path from "path";
import { Configuration } from "webpack";
import webpackNodeExternals from "webpack-node-externals";

const rootPath = path.resolve(__dirname, "..");

const config: Configuration = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  entry: {
    main: path.resolve(rootPath, "src/main", "main.ts"),
    preload: path.resolve(rootPath, "src/rendererPreload", "preload.ts"),
  },
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  node: {
    __dirname: false,
  },
  output: {
    path: path.resolve(rootPath, "dist"),
    filename: "[name].js",
  },
  plugins: [new ESLintPlugin({ extensions: ["ts", "tsx"], failOnError: true })],
  // https://github.com/kribblo/node-ffmpeg-installer/issues/39#issuecomment-689823370
  externals: [
    webpackNodeExternals(),
    { "@ffmpeg-installer/ffmpeg": { commonjs: "@ffmpeg-installer/ffmpeg" } },
  ],
};

export default config;
