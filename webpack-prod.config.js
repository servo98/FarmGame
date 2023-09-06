const baseFile = require('./webpack-base.config');

baseFile.plugins
  .push
  // new CompressionPlugin({
  //   filename: '[path][base].gz',
  //   algorithm: 'gzip',
  //   test: /\.js$|\.css$|\.html$/,
  //   threshold: 10240,
  //   minRatio: 0.8,
  //   deleteOriginalAssets: false,
  // }),
  // new HtmlWebpackPlugin({
  //   template: 'index.html',
  // }),
  ();

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  ...baseFile,
  optimization: {
    minimizer: [new TerserPlugin()],
  },
};
