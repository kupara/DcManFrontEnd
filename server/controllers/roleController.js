(() => {
  'use strict';
  const Role = require('../models/roles');

  module.exports = {
    all: (req, res) => {
      Role.find({}, (err, roles) => {
        if (err) {
          res.send(err);
        } else {
          res.json(roles);
        }
      });
    },

    one: (req, res) => {
      Role.findById(req.params.id, (err, role) => {
        if (err) {
          res.send(err);
        }
        res.send(role);
      });
    },

    create: (req, res) => {
      let newRole = new Role(req.body);
      newRole.save((err, role) => {
        if (err) {
          res.send(err);
        } else {
          res.json(role);
        }
      });
    }
  };
})();