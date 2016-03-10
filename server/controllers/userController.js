(function () {
  'use strict';
  const User = require('../models/users');
  const Role = require('../models/roles');
  const Doc = require('../models/documents');

  module.exports = {
    all: function(req, res) {
      
    },
    createUser: function(req, res) {
      let newUser = new User(data);
      newUser.password = crypto.createHash('sha1').update(data.password).digest('base64');
      newUser.save(function(err, user){
        if(err) {
          res.send(err);
        } else {
          res.json(user);
        }
      });  
    },

    getAllUsers: function (req, res) {
      User.find({}, function (err, users) {
        if(err) {
          res.send(err);
        } else {
          res.json(users);
        }
      });
    },

    getUser: function (req, res) {
      User.findById(req.params.id, function(err, user) {
        if(err) {
            res.send(err);
          } else {
            res.json(user);
          }
      }); 
    },

    updateUser: function(req, res) {
      User.findByIdAndUpdate(req.params.id, req.body, { 'new': true}, function (err, user) {
        if(err) {
            res.send(err);
          } else {
            res.json(user);
          }
      }); 
    },

    deleteUser: function (req, res) {
      User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
       if(err) {
            res.send(err);
          } else {
            res.send("User deleted successfully");
          }
      });  
    },

    getMyDocs: function (req, res) {
      Doc.find({ownerId: req.params.id}, function (err, docs) {
        if(err) {
          res.send(err);
        } else {
          res.json(docs);
        }
      });
    }
  }
})();