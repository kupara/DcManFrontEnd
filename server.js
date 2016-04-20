(() => {
  'use strict';
  const express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    path = require('path'),
    mongoose = require('mongoose'),
    config = require('./server/config/config'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer(),
    isProduction = process.env.NODE_ENV === 'production';

  mongoose.connect(config.database, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Your app is  connected to the database');
    }
  });

  const publicPath = path.resolve(__dirname, 'public');
  const app = express(),
    routes = require('./server/routes');

  if (!isProduction) {
    app.use(logger('dev'));
  }
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(publicPath));
  app.use('/bower_components',  express.static(__dirname + '/bower_components'));

  if (isProduction) {
    // We require the bundler inside the if block because
    // it is only needed in a development environment
    let bundle = require('./bundle.js');
    bundle();

    // Any requests to localhost:3001/build is proxied
    // to webpack-dev-server
    app.all('/public/*', (req, res) => {
      proxy.web(req, res, {
        target: 'http://localhost:8081'
      });
    });
  }
  proxy.on('error', function(e) {
      console.log('Could not connect to proxy, please try again....');
  });

  routes(app);

  const PORT = process.env.PORT || '3001';
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.log('Listening on ', PORT);
    });
  module.exports = app;
})();
