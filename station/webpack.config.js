var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: ['./src/js/app/index.js', './src/js/app.js'],
  output: {
    path: path.resolve(__dirname, 'src/dist/js'),
    filename: '[name].bundle.js'
  }
}