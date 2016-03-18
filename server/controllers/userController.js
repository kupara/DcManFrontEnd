(function() {
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
      User.findOne({username: req.body.username})
        .select('username')
        .exec(function(err, user){
        //check if username is unique
        if (user&&user.username===req.body.username) {
          res.send({
            error: {
              message: 'Please select another username'
            }
          });
        } else {
          let newUser = new User(req.body);
          let userData = us.pick(newUser, '_id', 'username', 'name', 'email');
          //create a token for the user
          let token = createToken(userData);

          newUser.save(function(err, user){
            if(err) {
              res.send(err);
            } else {
              let userData = us.pick(user, '_id', 'username', 'name', 'email');
              res.send({
                  message: 'User created successfully',
                  user: userData,
                  token: token
                });
            }
          }); 
        }
      });  
    },

    login: function(req, res, next) {
      //get user from body
      User.findOne({})
        .where('username').equals(req.body.username)
        .select('password role name')
        .exec(function(err, user) {
        if (err) {
          next(err);
        }
        if(!user) {
          res.status(401).send({
            error: {
                message: 'Wrong username'
              }
          });
        } else if (user) {
          //check password
          let correct = user.checkPass(req.body.password);
          if (!correct) {
            res.status(401).send({
              error: {
                message: 'Invalid password'
              }
            });
            next(err);
          } else {
            let userData = us.pick(user, '_id', 'username', 'role', 'name', 'email'),
              token = createToken(userData);
            res.send({
              message: 'Login successful',
              token: token,
              user: userData
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
            let userData = us.pick(user, '_id', 'username', 'docs', 'email');
            res.json(userData);
          }
      }); 
    },

    update: function(req, res, next) {
      let id = req.params.id, data = req.body;
      User.findOneAndUpdate({_id: id}, data, {'new': true}, function(err, user) {
        if(err) {
          return next(err);
        }
        if (!user) {
          next(new Error('User not found'));
        } else {
            let userData = us.pick(user, '_id', 'username', 'name', 'email');
            res.send({
              message: 'User updated successfully',
              user: userData
            });
          }
      }); 
    },

    delete: function (req, res) {
      User.findByIdAndRemove(req.params.id, function (err, user) {
       if(err) {
            res.send(err);
          } else {
            if(user) {
              let userData = us.pick(user, '_id', 'username', 'name', 'email');
              res.send({
                message: 'User deleted successfully',
                user: userData
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

//    session: function(req, res) {
//      //TODO: implement session
//    },
    
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