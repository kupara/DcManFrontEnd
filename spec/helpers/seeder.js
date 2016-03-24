(function () {
  'use strict';
  var async = require('async');
  var Roles = require('../../server/models/roles');
  var Users = require('../../server/models/users');
  var Documents = require('../../server/models/documents');

  async.waterfall([
    function (cb) {
      Users.remove({}, function () {});
      // done();

      Roles.remove({}, function () {});
      // done();

      Documents.remove({}, function () {});
      //done();

      cb(null);
    },

    function (cb) {
      Users.create([{
        name: {
          first: 'Test',
          last: 'User'
        },
        username: 'adminUser',
        email: 'admin@email.com',
        createdAt: new Date(),
        role: 'admin',
        password: 'admin123'
      }, {
        name: {
          first: 'Edwin',
          last: 'Wekesa'
        },
        username: 'edwin',
        email: 'owner@email.com',
        createdAt: new Date(),
        role: 'user',
        password: 'edu123'
      }, {
        name: {
          first: 'Justa',
          last: 'Viewer'
        },
        username: 'theviewer',
        email: 'viewer@email.com',
        createdAt: new Date(),
        role: 'viewer',
        password: 'thv123'
      }], function (err, users) {
        if (err) {
          throw err;
        }
        cb(null, users);
      });
    },

        //SEED Roles

    function (users, cb) {
      Roles.create([{
        title: 'admin'
      }, {
        title: 'user'

      }, {
        title: 'viewer'

      }]);
      cb(null, users);
    },
        //SEED DOCUMENTS

    function (users, cb) {
      Documents.create([{
          ownerId: users[0]._id,
          title: 'Admin\'s document',
          content: 'This document belongs to the admin and can only be viewed by admins',
          accessLevel: 'admin'
          },
        {
          ownerId: users[1]._id,
          title: 'Edwin\'s document',
          content: 'This document belongs to the its owner accessible to admins and the owner',
          accessLevel: 'private'

          },
        {
          ownerId: users[2]._id,
          title: 'Public document',
          content: 'This document is public and can only be viewed by anyone',
          accessLevel: 'public'

          }], function (err) {
        if (err) {
          throw err;
        }
        cb(null);
      });
        }

  ], function () {
    console.log('DB Seeded');
  });
})();