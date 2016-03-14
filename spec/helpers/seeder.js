(function() {
  'use strict';

  var Users = require('../../server/models/users');
  var Documents = require('../../server/models/documents');
  var Roles = require('../../server/models/roles');
  var request = require('supertest');
  var app = require('../../dcman');

  Users.find({}).remove().then(() => {
    Users.create({
      name: {
        first: 'Test',
        last: 'User'
      },
      username: 'admin',
      email: 'admin@email.com',
      createdAt: new Date(),
      role: 'admin',
      password: 'adm123'
    },
    {
      name: {
        first: 'The',
        last: 'Owner'
      },
      username: 'owner',
      email: 'owner@email.com',
      createdAt: new Date(),
      role: 'owner',
      password: 'own123'
    },
    {
      name: {
        first: 'Justa',
        last: 'Viewer'
      },
      username: 'theviewer',
      email: 'viewer@email.com',
      createdAt: new Date(),
      role: 'viewer',
      password: 'adm123'
    })
    done();
  });
})();