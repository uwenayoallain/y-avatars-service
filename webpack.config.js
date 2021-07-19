const webpack = require("webpack");

const serverConfig = {
  entry: "./server.js",
  target: "node",
  output: {
    path: __dirname,
    filename: "server.js",
    libraryTarget: "commonjs2",
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: (url) => url.replace(/public/, ""),
          emit: false,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader/locals",
          },
        ],
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: "__isBrowser__ = false;",
      raw: true,
      include: /\.js$/,
    }),
  ],
};

module.exports = [serverConfig];
