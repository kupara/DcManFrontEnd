(function () {
  'use strict';
  const crypto = require('crypto'),
    User = require('../models/users'),
    Role = require('../models/roles'),
    Doc = require('../models/documents'),
    config = require('../config/config'),
    jwt = require('jsonwebtoken'),
    secretKey = config.secretKey;

  module.exports = {
    all: function (req, res) {
      User.find({}, function (err, users) {
        if(err) {
          res.send(err);
        } else {
          res.json(users);
        }
      });
    },
    
    create: function(req, res) {
      let newUser = new User(req.body);
      newUser.password = crypto.createHash('sha1').update(req.body.password).digest('base64');
      newUser.save(function(err, user){
        if(err) {
          res.send(err);
        } else {
          res.json(user);
        }
      });  
    },

    login: function(req, res, next) {
      //TODO: implement login
    },

    getOne: function (req, res) {
      User.findById(req.params.id, function(err, user) {
        if(err) {
            res.send(err);
          } else {
            res.json(user);
          }
      }); 
    },

    update: function(req, res) {
      User.findByIdAndUpdate(req.params.id, req.body, { 'new': true}, function (err, user) {
        if(err) {
            res.send(err);
          } else {
            res.json(user);
          }
      }); 
    },

    delete: function (req, res) {
      User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
       if(err) {
            res.send(err);
          } else {
            res.send("User deleted successfully");
          }
      });  
    },
    
    authenticate: function(req, res, next) {
      let token = req.headers['x-access-token'] || req.body.token;
      
      // does token exist?
      if (token) {
        jwt.verify(token, secretKey, function(err, decoded) {
          if (err) {
            res.status(401).send({
              error: 'Failed to Authenticate'
            });
          } else {
            req.decoded = decoded;
            req.token = token;
            next();
          }
        }); 
      } else {
        res.status(401).send({
          error: 'You are not authenticated'
        });
      }
    },

    session: function(req, res) {
      //TODO: implement session
    },
    
    logout: function(req, res) {
      //TODO: implement logout
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