(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var mongoose = require('mongoose');
  var User = require('../models/documents');

  router.route('/documents')
    .get(function(req, res) {
      res.send({document:'This document'});
    })
    .post(function(req, res) {
      //TODO create doc
  });
  module.exports = router;
})();