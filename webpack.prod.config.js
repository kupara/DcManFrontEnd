const path = require('path')
const webpack = require('webpack')
const appPath = path.resolve(__dirname, 'app', 'app.js');
module.exports = {
  devtool: 'source-map',

  entry: {
    main: [
      appPath
    ]
  },

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  module: {
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
}
