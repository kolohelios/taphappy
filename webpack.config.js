const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: [
    './App.js'
  ],
  output: {
    path: path.join(__dirname, 'app'),
    filename: './build/bundle.js'
  },
  devServer: {
    inline: true
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['react', 'es2015'] }
      },
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass' ]
      }
    ]
  }
};
