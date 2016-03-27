(function () {
  'use strict';
  const User = require('../models/users'),
    Documents = require('../models/documents'),
    config = require('../config/config'),
    jwt = require('jsonwebtoken'),
    _ = require('underscore'),
    secretKey = config.secretKey;

  function createToken(user) {
    const token = jwt.sign(user, secretKey, {
      expiresIn: '24h'
    });
    return token;
  }

  module.exports = {
    all: function (req, res) {
      User.find({}, function (err, users) {
        if (err) {
          res.send(err);
        } else {
          res.json(users);
        }
      });
    },

    register: function (req, res) {
      User.findOne({
          username: req.body.username
        })
        .select('username')
        .exec(function (err, user) {
          if (user && user.username === req.body.username) {
            res.send({
              error: {
                message: 'Please select another username'
              }
            });
          } else {
            let newUser = new User();
            newUser.username = req.body.username;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            newUser.role = req.body.role;
            newUser.name.first = req.body.firstname;
            newUser.name.last = req.body.lastname;
            let userData = _.pick(newUser, '_id', 'username', 'name', 'email');
            let token = createToken(userData);

            newUser.save(function (err, user) {
              if (err) {
                res.send(err);
              } else {
                let userData = _.pick(user, '_id', 'username', 'name', 'email');
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

    login: function (req, res, next) {
      User.findOne({})
        .where('username').equals(req.body.username)
        .select('password role name username email')
        .exec(function (err, user) {
          if (err) {
            next(err);
          }
          if (!user) {
            res.status(401).send({
              error: {
                message: 'Wrong username'
              }
            });
          } else if (user) {
            let correct = user.checkPass(req.body.password);
            if (!correct) {
              res.status(401).send({
                error: {
                  message: 'Invalid password'
                }
              });
              next(err);
            } else {
              let userData = _.pick(user, '_id', 'username', 'role', 'email'),
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
      User.findById(req.params.id, function (err, user) {
        if (err) {
          res.send(err);
        } else {
          let userData = _.pick(user, '_id', 'username', 'email');
          res.json(userData);
        }
      });
    },

    update: function (req, res) {
      let id = req.params.id;
      User.findByIdAndUpdate(id, req.body, function (err, user) {
        if (err) {
          res.send(err);
        } else if (!user) {
          res.status(404).send({
            error: {
              message: 'User not found'
            }
          });
        } else {
            res.send({
              message: 'User updated successfully',
              user: user
            });
          }
        
      });
    },

    delete: function (req, res) {
      User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
          res.send(err);
        } else {
          if (user) {
            let userData = _.pick(user, '_id', 'username', 'name', 'email');
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

    authenticate: function (req, res, next) {
      let token = req.headers['x-access-token'] || req.body.token;

      if (token) {
        jwt.verify(token, secretKey, function (err, decoded) {
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

    canAccess: function (req, res, next) {
      Documents.findById(req.params.id, function(err, document){
        if (document) {
          if (req.decoded._id === document.ownerId.toString()) {

            next();
          } else if (req.decoded.role === 'admin') {
            next();
          } else {
            return res.status(403).send({
              error: {
                message: 'You have no permission to make changes to this document'
              }
            });
          }
        }  
      });
    },

    logout: function (req, res) {
      req.headers['x-access-token'] = null;
      res.send({
        message: 'Successfully logged out'
      });
    },

    getMyDocs: function (req, res) {
      User.findById(req.params.id, function (err, user) {
        if (err) {
          res.send(err);
        } else {
          Documents.find({
            ownerId: user._id
          }, function (err, documents) {
            if (err) {
              res.send(err);
            } else {
              res.json(documents);
            }
          });
        }
      });
    }
  };
})();