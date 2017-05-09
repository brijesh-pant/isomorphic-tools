var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  target:  "web",
  cache:   false,
  context: __dirname,
  devtool: false,
  entry:   ["./src/client"],
  output:  {
    path:          path.join(__dirname, "static/dist"),
    filename:      "client.js",
    chunkFilename: "[name].[id].js",
    publicPath:    "dist/"
  },
  plugins: [
    new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
    new webpack.DefinePlugin({"process.env": {NODE_ENV: "\"production\""}}),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("[name].css")
  ],
  module:  {
    loaders: [
      { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { include: /\.json$/, loaders: ["json"] },
      // { include: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true',
          publicPath: "/dist/",
      })},
    ],
    rules: [
      { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/ }
    ],
    noParse: /\.min\.js/
  },
  resolve: {
    alias: {
      react: path.join(__dirname, "node_modules/react")
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules', "web_modules"],
    extensions: [".json", ".js"]
  },
  node:    {
    __dirname: true,
    fs:        "empty"
  }
};