import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const devMode = process.env.NODE_ENV !== "production";

const config = {
  mode: devMode ? "development" : "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [],
  },
  optimization: {
    chunkIds: "natural",
  }
}

export default (env, argv) => {
  const environment = argv.mode ?? "production";
  const devMode = environment !== "production";

  config.devtool = devMode ? "eval-source-map" : "source-map";

  config.plugins = config.plugins.concat(
    devMode
      ? []
      : [
        new MiniCssExtractPlugin({
          filename: "style.css",
        })
      ],
  );

  config.module.rules = config.module.rules.concat(
    [
      {
        test: /\.(scss)$/i,
        use: [
          devMode
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ]
      }
    ]
  );
  
  return config;
}
