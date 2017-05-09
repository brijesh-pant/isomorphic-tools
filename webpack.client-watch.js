var webpack = require('webpack');
var config = require('./webpack.client.js');

var hostname = process.env.HOSTNAME || "localhost";

config.cache = true;
config.devtool = "eval-sourcemap";

config.entry.unshift(
  "webpack-dev-server/client?http://" + hostname + ":8080",
  "webpack/hot/only-dev-server",
  'react-hot-loader/patch'
);

config.output.publicPath = "http://" + hostname + ":8080/dist/";
config.output.hotUpdateMainFilename = "update/[hash]/update.json";
config.output.hotUpdateChunkFilename = "update/[hash]/[id].update.js";

config.plugins = [
  new webpack.LoaderOptionsPlugin({
      debug: true,
  }),
  new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
];

// config.module.rules = [
//     {enforce: 'post', test: /\.js$/, loader: ["react-hot-loader/webpack"], exclude: /node_modules/}
// ]

config.devServer = {
  publicPath:  "http://" + hostname + ":8080/dist/",
  contentBase: "./static",
  hot:         true,
  inline:      true,
  lazy:        false,
  quiet:       true,
  noInfo:      false,
  headers:     {"Access-Control-Allow-Origin": "*"},
  stats:       {colors: true},
  host:        hostname
};

module.exports = config;