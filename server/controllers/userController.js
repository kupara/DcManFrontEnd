(() => {
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
    all: (req, res) => {
      User.find({}, (err, users) => {
        if (err) {
          res.send(err);
        } else {
          res.json(users);
        }
      });
    },

    register: (req, res) => {
      User.findOne({
          username: req.body.username
        })
        .select('username')
        .exec((err, user) => {
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
            newUser.loggedIn = true;
            let tokenData = _.pick(newUser, '_id', 'username', 'name', 'email', 'loggedIn');
            let token = createToken(tokenData);

            newUser.save((err, user) => {
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


    getOne: (req, res) => {
      User.findById(req.params.id, (err, user) => {
        if (err) {
          res.send(err);
        } else {
          let userData = _.pick(user, '_id', 'username', 'role', 'email');
          res.json(userData);
        }
      });
    },

    update: (req, res) => {
      let id = req.params.id;
      User.findById(id, (err, user) => {
        if (err) {
          res.send(err);
        } else if (!user) {
          res.status(404).send({
            error: {
              message: 'User not found'
            }
          });
        } else {
          if (req.body.email) {
            user.email = req.body.email;
          }
          if (req.body.password) {
            user.password = req.body.password;
          }
          if (req.body.role) {
            user.role = req.body.role;
          }
          user.save((err, user) => {
            if(err) {
              res.status(501).send({
                error: err
              });
            } else {
              res.send({
                message: 'User updated successfully',
                user: user
              });
            }
          });
        }
      });
    },

    delete: (req, res) => {
      User.findByIdAndRemove(req.params.id, (err, user) => {
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

    authenticate: (req, res, next) => {
      let token = req.headers['x-access-token'] || req.body.token;
      if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
            return res.status(401).send({
              error: 'Failed to Authenticate'
            });
          } else {
            req.decoded = decoded;
            req.token = token;
            next();
          }
        });
      } else {
        return res.status(401).send({
          error: 'You are not authenticated'
        });
      }
    },

    canAccess: (req, res, next) => {
      Documents.findById(req.params.id, (err, document) => {
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

    login: (req, res, next) => {
      User.findOneAndUpdate({
          username: req.body.username
        }, {
          $set: {
            loggedIn: true
          }
        }, {
          new: true
        })
        .select('password role name username email')
        .exec((err, user) => {
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
                user: userData,
                loggedIn: true
              });
            }
          }
        });
    },

    session: (req, res) => {
      User.findById(req.decoded._id, (err, user) => {
        if (err || !user) {
          res.json({
            loggedIn: 'false'
          });
        } else {
          let userData = _.pick(user, '_id', 'name', 'username', 'role', 'email');
          return res.json({
            user: userData,
            loggedIn: user.loggedIn.toString()
          });
        }
      });
    },

    logout: (req, res, next) => {
      User.findByIdAndUpdate(req.decoded._id, {
          loggedIn: false
        })
        .exec((err, user) => {
          if (err || !user) {
            return next(err);
          } else {
            res.json({
              message: 'Successfully logged out',
              loggedIn: false
            });
          }
        });
    },

    getMyDocs: (req, res) => {
      User.findById(req.params.id, (err, user) => {
        if (err) {
          res.send(err);
        } else {
          Documents.find({
            ownerId: user._id
          }, (err, documents) => {
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
