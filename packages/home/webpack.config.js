const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src", "index.js") // [name]: [path] path to the entrypoint file
  },
  output: {
    path: path.resolve(__dirname, "dist"), // path to the output directory
    filename: "[name].[contenthash].js", // name of the output bundle with hash for cache busting
    clean: true, // removes old files from output directory
    assetModuleFilename: "images/[hash][ext][query]" // custom filename for assets
  },
  devtool: "source-map", // generates source map for debugging
  devServer: {
    static: { directory: path.join(__dirname, "dist") }, // static files to serve
    port: 3000, // port to run dev server on
    open: false, // opens browser on start
    hot: true, // hot module replacement
    compress: true, // gzip compression
    historyApiFallback: true // fallback to index.html for SPA
  },
  module: {
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.scss$/,
        exclude: /(node_modules|dist)/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"] // babel preset for modern JS
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        exclude: /(node_modules|dist)/,
        type: "asset/resource"
      }
    ]
  },
  plugins: [
    // add plugins to the compiler
    new HtmlWebpackPlugin({
      // generates index.html with bundle.js injected
      title: "Webpack App",
      filename: "index.html",
      template: path.resolve(__dirname, "src", "template.html")
    }),
    new BundleAnalyzerPlugin({
      // generates bundle report
      analyzerMode: "static",
      openAnalyzer: false
      // generateStatsFile: true,
      // statsOptions: { source: false }
    })
  ]
};
