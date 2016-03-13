(function() {
  'use strict';
  const Role = require('../models/roles');

  module.exports = {
    all: function (req, res) {
      Role.find({}, function(err, roles){
        if (err) {
          res.send(err);
        } else {
          res.send(roles);
        }  
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
 
