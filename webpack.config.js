var path = require('path');
var webpack = require('webpack');


module.exports = {
  entry: [
    './public/js/index.js'
  ],
  output: {
      path: __dirname + '/public/dist',
      filename: 'index.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['env', 'stage-3']
        }
      },
      {
        test: /\.node$/,
        loader: "node-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.node']
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  watch: true 
}