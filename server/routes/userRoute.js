
  'use strict';
  const mongoose = require('mongoose');
  let User = require('../models/users');
  
  module.exports = function(app) {
    app.route('/users')
      .get(function(req, res) {
        User.getAllUsers(function(err, users){
          if(err) {
            res.send(err);
          } else {
            res.json(users);
          }
        });
    })
      .post(function(req, res) {
        User.createUser(req.body, function(err, user){
          if(err) {
            res.send(err);
          } else {
            res.json(user);
          }
        });
    });
    
    app.route('/users/:id')
      .get(function(req, res) {
          User.getUser(req.params.id, function(err, user){
          if(err) {
            res.send(err);
          } else {
            res.json(user);
          }
        });
    })
      .put(function(req, res) {
        User.updateUser(req.params.id, req.body,  function(err, user){
          if(err) {
            res.send(err);
          } else {
            res.json(user);
          }
        });
    })
      .delete(function(req, res) {
        User.deleteUser(req.params.id, req.body, function(err, user){
          if(err) {
            res.send(err);
          } else {
            res.json(user);
          }
        });
    });
  };