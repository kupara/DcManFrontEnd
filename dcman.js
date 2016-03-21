(function() {
  'use strict';
  const express = require('express'),
    bodyParser = require('body-parser'), 
    mongoose = require('mongoose'),
   // logger = require('morgan'),
    config = require('./server/config/config');
  // connect to database
  mongoose.connect(config.database, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Your app is  connected to the database');
    }
  });

  var app = express();
  var routes = require('./server/routes');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(logger('dev'));
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