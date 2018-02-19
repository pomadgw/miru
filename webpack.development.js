const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: 'build'
  },
  plugins: [
    new CheckerPlugin()
  ]
});
