(function() {
  'use strict';
  var express = require('express');
  var bodyParser = require('body-parser'); 
  var mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/dcman');

  var app = express();
  var routes = require('./server/routes');

  app.use(bodyParser.json());
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