var path = require('path');
var webpack = require('webpack');


module.exports = {
  entry: [
    './public/js/partials/interns'
  ],
  output: {
      path: __dirname + '/public/dist',
      filename: 'interns.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['env', 'es2015', 'stage-3']
        }
      }
    ]
  }
}