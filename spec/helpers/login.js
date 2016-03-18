(function() {
  'use strict';

  var server = require('../../dcman'),
    request = require('supertest');

  module.exports = {
    login: function(done) {
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
    create: function(done) {
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
    }
  };
})();