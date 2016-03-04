(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var mongoose = require('mongoose');
  var User = require('../models/roles');

  router.route('/roles')
    .get(function(req, res) {
      res.send({role:'Admin'});
    })
    .post(function(req, res) {
      //TODO create user role
  });
  module.exports = router;
})();