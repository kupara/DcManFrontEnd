(function() {
  'use strict';
  const Role = require('../models/roles'),
    us = require('underscore');

  module.exports = {
    all: function (req, res) {
      Role.find({}, function(err, roles){
        if (err) {
          res.send(err);
        } else {
          res.json(roles);
        }  
      });
    },
    
    one: function(req, res) {
      Role.findById(req.params.id, function(err, role) {
        if (err) console.log(err);
        
        res.send(role);
      });
    },
    
    create: function(req, res) {
      let newRole = new Role(req.body);
      newRole.save(function(err, role){
        if(err) {
          res.send(err);
        } else {
          res.json(role);
        }
      });
    }
  };
})();
 
