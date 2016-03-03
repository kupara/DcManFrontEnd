(function() {
  'use strict';
  var express = require('express');
  var path = require('path');
  var bodyParser = require('body-parser'); 
  var mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/3001/dcman');

  // require('./server/models/users');
  var index = require('./server/routes/index');
  var users = require('./server/routes/users');

  var app = express();

  // app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(cookieParser());
 //app.use(express.static(path.join(__dirname, 'public')));
 
  app.use('/api', index);

  var PORT = process.env.PORT || '3001';
    app.listen(PORT, function(err) {
      if (err) {
        console.log(err);
      }
      console.log('Listening on ', PORT);
    });
module.exports = app;
})();