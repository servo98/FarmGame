const baseFile = require('./webpack-base.config');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  ...baseFile,
  optimization: {
    minimizer: [new TerserPlugin()],
  },
};
