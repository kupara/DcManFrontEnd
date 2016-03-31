var webpack = require('webpack');
var path = require('path');

var appPath = path.resolve(__dirname, 'app', 'app.js');

module.exports = {
  entry: {
    main: [
      appPath
    ]
  },

  output: {
    filename: 'client.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public/'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/, loader: 'jshint-loader', exclude: /node_modules/
      }
    ],
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'app'),
      loader: 'babel-loader',
      exclude: [path.resolve(__dirname, 'node_modules')]
    }, {
      test: /\.css?$/,
      include: path.join(__dirname, 'app'),
      exclude: [path.resolve(__dirname, 'node_modules')],
      loader: 'style-loader!css-loader'
    }]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
