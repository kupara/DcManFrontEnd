(function() {
  'use strict';
  const express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./server/config/config');

  mongoose.connect(config.database, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Your app is  connected to the database');
    }
  });

  const app = express(),
    routes = require('./server/routes');

  app.use(bodyParser.json());
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  routes(app);

  var PORT = process.env.PORT || '3001';
    app.listen(PORT, function(err) {
      if (err) {
        console.log(err);
      }
      console.log('Listening on ', PORT);
    });
  module.exports = app;
})();