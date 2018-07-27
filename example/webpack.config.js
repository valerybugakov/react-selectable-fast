const path = require('path')

module.exports = {
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  mode: 'development',
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'example.js'),
  output: {
    path: path.resolve(__dirname),
    publicPath: '',
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },

  resolve: {
    modules: ['node_modules', 'dist'],
  },
}
