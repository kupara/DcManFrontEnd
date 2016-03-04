(function() {
  'use strict';

  var User = require('../models/users');
  module.exports = function(app) {
    app.route('/users')
      .get(function(req, res) {
        res.send({user:'User'});
      })
      .post(function(req, res) {
        //TODO create user
    });
  };
})();