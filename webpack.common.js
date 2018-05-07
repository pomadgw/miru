// Basen on config at http://ccoenraets.github.io/es6-tutorial/setup-webpack/
const CleanWebpackPlugin = require('clean-webpack-plugin')

var path = require('path')
var webpack = require('webpack')

module.exports = {
  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  entry: {
    miru: './src/index.ts',
    // example: './src/example.jsx'
  },
  plugins: [
    new CleanWebpackPlugin(['build'])
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
}
