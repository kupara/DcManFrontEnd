(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var mongoose = require('mongoose');
  var User = require('../models/users');

  router.route('/users')
    .get(function(req, res) {
      res.send({user:'User'});
    })
   .post(function(req, res) {
      //TODO create user
  });
  module.exports = router;
})();