(function () {
  'use strict';
  const User = require('../models/users'),
   // Role = require('../models/roles'),
    Doc = require('../models/documents'),
    config = require('../config/config'),
    jwt = require('jsonwebtoken'),
    us = require('underscore'),
    secretKey = config.secretKey;
  //tokenCreator
  function createToken(user) {
    var token = jwt.sign(user, secretKey, {
      expiresIn: '24h'
    });
    return token;
  }
  
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
    
    register: function(req, res) {
      let newUser = new User(req.body);
      let userDetails = us.pick(newUser, '_id', 'username', 'name', 'email')
      //create a token for the user
      let token = createToken(userDetails);
      
      newUser.save(function(err, user){
        if(err) {
          res.send(err);
        } else {
          res.send({
              message: 'User created successfully',
              user: user,
              token: token
            });
        }
      });  
    },

    login: function(req, res, next) {
      //get user from body
      User.findOne({username: req.body.username})
        .select('password')
        .exec(function(err, user) {
        if (err) {
          next(err);
        }
        if(!user) {
          res.send({
            message: 'Wrong username'
          });
        } else if (user) {
          //check password
          let correct = user.checkPass(req.body.password);
          if (!correct) {
            res.status(500).send({
              message: 'Invalid password'
            });
            next(err);
          } else {
            let userDetails = us.pick(user, '_id', 'username', 'name', 'email'),
              token = createToken(userDetails);
            res.status(200).send({
              message: 'Login successful',
              token: token,
              user: userDetails
            });
          }
        }
      });
    },

    getOne: function (req, res) {
      User.findById(req.params.id, function(err, user) {
        if(err) {
            res.send(err);
          } else {
            let userDetails = us.pick(user, '_id', 'username', 'docs', 'name', 'email');
            //user.password = null;
            res.json(userDetails);
          }
      }); 
    },

    update: function(req, res) {
      let id = req.params.id, data = req.body;
      User.findByIdAndUpdate(id, data, { 'new': true}, function (err, user) {
        if(err) {
            res.send(err);
          } else {
            let userDetails = us.pick(user, '_id', 'username', 'docs', 'name', 'email');
            res.send({
              message: 'User updated successfully',
              user: userDetails
            });
          }
      }); 
    },

    delete: function (req, res) {
      User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
       if(err) {
            res.send(err);
          } else {
            if(user) {
              let userDetails = us.pick(user, '_id', 'username', 'docs', 'name', 'email');
              res.send({
                message: 'User deleted successfully',
                user: userDetails
              });
            } else {
              res.send({
                message: 'User is already deleted'
              });
            }
          }
      });  
    },
    
    authenticate: function(req, res, next) {
      let token = req.headers['x-access-token'] || req.body.token;
      
      // does token exist?
      if (token) {
        jwt.verify(token, secretKey, function(err, decoded) {
          // invalid token
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
        //non-existent token
        res.status(401).send({
          error: 'You are not authenticated'
        });
      }
    },

    session: function(req, res) {
      //TODO: implement session
    },
    
    logout: function(req, res) {
      //req.headers['x-access-token'] = null;
      res.send({
        message: 'Successfully logged out'
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
  };
})();