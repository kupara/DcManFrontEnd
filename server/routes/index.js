(function() {
  'use strict';

	var express = require('express');
	var router = express.Router();

	router.use('/', require('./users'));
	router.use('/', require('./documents'));
	router.use('/', require('./roles'));
	router.route('/')
	.get(function(req, res) {
			res.send({message: 'You are home'});
	});
	module.exports = router;
	})();