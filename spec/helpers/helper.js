(function() {
  'use strict';

  var server = require('../../dcman'),
    request = require('supertest');

  module.exports = {
    adminLogin: function(done) {
      request(server)
      .post('/users/login')
      .send({
        username: 'admin',
        password: 'adm123'
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
        password: 'adm123'
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
        name: {
          first: 'Delete',
          last: 'User'
        },
        role: 'viewer',
        password: '123456'
      })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        done(res.body);
      });
    },
    createDoc: function(token, done) {
      request(server)
      .post('/documents')
      .send({
        owner: 'admin',
        title: 'Only document to be returned',
        content: 'This document should be the only one returned',
        access: 2
      })
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .end(function(err, res) {
        done(res.body);
      });
    }
  };
})();