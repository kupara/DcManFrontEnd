(function() {
  'use strict';
  var async = require('async');
  var Roles = require('../../server/models/roles');
  var Users = require('../../server/models/users');
  var Documents = require('../../server/models/documents');
  
  async.waterfall([
    function(done) {
      async.series([
        function(done) {
          Users.remove({}, function() {});
          done();
        },
        function(done) {
          Roles.remove({}, function() {});
          done();
        },
        function(done) {
          Documents.remove({}, function() {});
          done();
        }], function(){
        console.log('DB dropped');
      }); 
     done();
    },
    
    function(done) {
      
      
      async.series([
        //SEED USERS
        
        function(done){
          console.log('Creating users...');
          Users.create({
            name: {
              first: 'Test',
              last: 'User'
            },
            username: 'admin',
            email: 'admin@email.com',
            createdAt: new Date(),
            role: 'admin',
            password: 'adm123',
            docs: []
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
            password: 'own123',
            docs: []
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
            password: 'adm123',
            docs: []
          });
          done();
        },

        //SEED Roles
        
        function(done) {
          console.log('Creating Roles...');
          Roles.create({
            title: 'admin'
          },
          {
            title: 'owner'

          },
          {
            title: 'viewer'

          });
          done();
        },
        //SEED DOCUMENTS
        
        function(done) {
          console.log('Creating Documents...');
          
          Documents.create([{
            owner: 'admin',
            title: 'Admin\'s document',
            content: 'This document belongs to the admin and can only be viewed by admins',
            access: 0
          },
          {
            owner: 'owner',
            title: 'Viewer\'s document',
            content: 'This document belongs to the its owner accessible to admins and the owner',
            access: 1

          },
          {
            owner: 'theviewer',
            title: 'Public document',
            content: 'This document is public and can only be viewed by anyone',
            access: 2

          }], function(){
            done();
          });
        }
      ], function(){
      });
      done();
    }
  ], function() {
    console.log('DB Seeded');
  });
})();
