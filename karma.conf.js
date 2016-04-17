var webpack = require('webpack');
var path = require('path');

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'], //run in PhantomJs
    singleRun: false, //just run once by default
    frameworks: ['mocha'], //use the mocha test framework
    files: [
      'tests.webpack.js' //just load this file
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'] //preprocess with webpack and our sourcemap loader
    },
    reporters: ['mocha', 'coverage'], //report results in this format
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        noParse: [
          /node_modules\/sinon/
        ],
        loaders: [{
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['react', 'es2015']
          }
        }, {
          test: /\.json$/,
          loader: 'json'
        }, {
            test: /(\.scss|\.css)$/,
            loaders: [
              require.resolve('style-loader'),
              require.resolve('css-loader') + '?sourceMap',
              require.resolve('sass-loader') + '?sourceMap'
            ]
        }, {
          test: /\.(png|jpg|jpeg)$/,
          exclude: /node_modules/,
          loader: 'url-loader?limit=8192' // limit of 8kb
        }, {
          test: /\.jsx?$/,
          include: path.resolve('app'),
          exclude: /__tests__/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015']
          }
        }]
      },
      resolve: {
        alias: {
          sinon: 'sinon/pkg/sinon.js'
        },
        root: __dirname,
        extensions: ['', '.js', '.jsx', '.json']
      },
      externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },
    webpackServer: {
      noInfo: true //don't spam the console!
    },
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: 'lcov' }
      ]
    }
  });
};
