var webpack = require('webpack');
var path = require('path');

var appPath = path.resolve(__dirname, 'app', 'app.js');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: [
      appPath
    ]
  },

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public'
  },

  devServer: {
    contentBase: '/public'
  },

  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json']
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'app'),
      loader: 'babel-loader',
      exclude: [path.resolve(__dirname, 'node_modules')],
      query:
      {
        presets:['react', 'es2015']
      }
    }, {
        test: /(\.scss|\.css)$/,
        loaders: [
          require.resolve('style-loader'),
          require.resolve('css-loader') + '?sourceMap',
          require.resolve('sass-loader') + '?sourceMap'
        ]
      },
    {
      test: /\.jpg?$/,
      include: path.join(__dirname, 'app'),
      exclude: [path.resolve(__dirname, 'node_modules')],
      loader: 'url-loader'
    }]
  }
};
