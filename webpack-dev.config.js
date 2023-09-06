const baseFile = require('./webpack-base.config');
const path = require('path');

module.exports = {
  ...baseFile,
  devServer: {
    static: path.join(__dirname, 'dist'),
    open: true,
  },
};
