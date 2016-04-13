(function() {
  'use strict';

  var server = require('../../server'),
    request = require('supertest');

  module.exports = {
    adminLogin: function(done) {
      request(server)
      .post('/users/login')
      .send({
        username: 'adminUser',
        password: 'admin123'
      })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        done(res.body);
      });
    },

    userLogin: function(done) {
      request(server)
      .post('/users/login')
      .send({
        username: 'edwin',
        password: 'edu123'
      })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        done(res.body);
      });
    },

    viewerLogin: function(done) {
      request(server)
      .post('/users/login')
      .send({
        username: 'theviewer',
        password: 'thv123'
      })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        done(res.body);
      });
    },

    createUser: function(done) {
      request(server)
      .post('/users')
      .send({
        username: 'delete',
        email: 'user@delete.com',
        firstname: 'Delete',
        lastname: 'User',
        role: 'viewer',
        password: '123456'
      })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        done(res.body);
      });
    },

    createDoc: function(token, id, done) {
      request(server)
      .post('/documents')
      .send({
        ownerId: id,
        title: 'Only document to be returned',
        content: 'This document should be the only one returned',
        accessLevel: 'private'
      })
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .end(function(err, res) {
        done(res.body);
      });
    }
  };
})();
