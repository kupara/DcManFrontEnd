(function() {
  'use strict';

  const User = require('../models/documents');
  
  module.exports = function(app) {
    app.route('/documents')
      .get(function(req, res) {
        res.send({document:'Doc'});
      })
      .post(function(req, res) {
        //TODO create user
    });
  };
})();