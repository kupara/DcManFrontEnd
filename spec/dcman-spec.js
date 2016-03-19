(function() {
  'use strict';

  var supertest = require('supertest');
  var server = require('../dcman');
  var request = supertest(server);
  //var seeder = require('./helpers/seeder');
  var helper = require('./helpers/login');

  
  var token, id;
  describe('Test suite dcman-api', function() {

    beforeAll(function(done) {
      require('./helpers/seeder');
      done();
    });
    beforeEach(function(done) {
      helper.adminLogin(function(body) {
        token = body.token;
        id = body.user._id;
        done();
      });
    });

    //TESTS FOR USER CONTROLLER
    describe('User suite', function() {
      it('creates a user successfully and returns a token', function(done) {
        request
        .post('/users')
        .send({
          username: 'kups',
          email: 'edwin@kups.com',
          name: {
            first: 'Edwin',
            last: 'Kups'
          },
          role: 'admin',
          password: 'abc123'
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('User created successfully');
          expect(res.body.user.username).toEqual('kups');
          expect(res.body.user._id).toBeDefined();
          expect(res.body.token).toBeDefined();
          done();
        });
      });

      it('creates a user with a unique username', function(done) {
        request
        .post('/users')
        .send({
          username: 'admin',
          email: 'test@email.com',
          password: 'abc123',
          name: {
            first: 'Test',
            last: 'User'
          }
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          //expect(res.status).toEqual(500);
          expect(res.body).toBeDefined();
          expect(res.body.error).toBeDefined();
          expect(res.body.error.message).toBe('Please select another username');
          done();
        });
      });

      it('requires a password during creation', function(done) {
        request
        .post('/users')
        .send({
          email: 'evan@andela.com',
          name: 'Evan Greenlowe'
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(res.body).toBeDefined();
          expect(res.body.errors).toBeDefined();
          expect(res.body.message).toBe('User validation failed');
          done();
        });
      });

      it('requires a both last name and username during creation', function(done) {
        request
        .post('/users')
        .send({
          username: 'wekesa',
          email: 'test@email.com',
          password: 'abc123'
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(res.body).toBeDefined();
          expect(res.body.errors).toBeDefined();
          expect(res.body.message).toBe('User validation failed');
          done();
        });
      });
      
      it('returns an error on invalid password when logging in', function(done) {
        request
        .post('/users/login')
        .send({
          username: 'admin',
          password: 'abc124'
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toEqual(401);
          expect(res.body).toBeDefined();
          expect(res.body.error).toBeDefined();
          expect(res.body.error.message).toContain('Invalid password');
          done();
        });
      });
      
      it('returns an error on invalid username when logging in', function(done) {
        request
        .post('/users/login')
        .send({
          username: 'admins',
          password: 'adm123'
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toEqual(401);
          expect(res.body).toBeDefined();
          expect(res.body.error).toBeDefined();
          expect(res.body.error.message).toContain('Wrong username');
          done();
        });
      });

      it('returns a token on user login', function(done) {
        request
        .post('/users/login')
        .send({
          username: 'admin',
          password: 'adm123'
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toEqual(200);
          expect(res.body).toBeDefined();
          expect(res.body.token).toBeDefined();
          done();
        });
      });

      it('returns one user provided an id', function(done) {
       request
        .get('/users/'+id)
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toEqual(200);
          expect(res.body).toBeDefined();
          expect(Array.isArray(res.body)).toBe(false);
          expect(res.body.username).toEqual('admin');
          done();
        });
       });
      
      it('updates the user whose id is provided', function(done) {
       request
        .put('/users/'+id)
        .set('x-access-token', token)
        .send({
          email: 'admin@admin.com',
          name: {
            first: 'Admin'
          }
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('User updated successfully');
          expect(res.body.user.name.first).toEqual('Admin');
          expect(res.body.user.email).toEqual('admin@admin.com');
          done();
        });
       });
      
      it('returns an error when updating a non-existent user', function(done) {
       request
        .put('/users/56e71e392100143743ae95e5')
        .set('x-access-token', token)
        .send({
          email: 'admin@admin.com',
          name: {
            first: 'Admin'
          }
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(res.status).toEqual(404);
          expect(res.body.error).toBeDefined();
          expect(res.body.error.message).toEqual('User not found');
          done();
        });
       });
      
      it('successfully logs a user out', function(done) {
        request
        .get('/users/logout')
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toEqual(200);
          expect(res.body).toBeDefined();
          expect(res.body.message).toEqual('Successfully logged out');
          done();
        });
      });
      
      it('successfully deletes a user', function(done) {
        helper.create(function(body){
          let delete_token = body.token;
          let delete_id = body.user._id;
          request
          .delete('/users/' + delete_id)
          .set('x-access-token', delete_token)
          .set('Accept', 'application/json')
          .end(function(err, res) {
            expect(err).toBeNull();
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.message).toEqual('User deleted successfully');
            done();
          });
        });
      });
      
      it('returns the documents belonging to a user', function(done) {
        request
        .get('/users/' + id +'/documents')
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toEqual(200);
          expect(res.body).toBeDefined();
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toEqual(1);
          done();
        });
      });
      
      it('returns all users if token is provided', function(done) {
       request
        .get('/users')
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toEqual(200);
          expect(res.body).toBeDefined();
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(2);
          done();
        });
      });
    });
    
    
    describe('Role suite', function() {
      it('creates a role with a title defined', function(done){
        request
        .post('/users/roles')
        .send({
          title: 'tester'
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toEqual(200);
          expect(res.body).toBeDefined();
          expect(res.body.title).toEqual('tester');
          done();
        });
      });
      
      it('cannot create a role with a duplicate title ', function(done){
        request
        .post('/users/roles')
        .send({
          title: 'tester'
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(res.body).toBeDefined();
          expect(res.body.code).toBe(11000);
          expect(res.body.errmsg).toContain('duplicate key error');
          done();
        });
      });
      
      it('cannot create a role whose title isn\'t enumerated', function(done){
        request
        .post('/users/roles')
        .send({
          title: 'random'
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(res.body.errors).toBeDefined();
          expect(res.body.name).toBe('ValidationError');
          expect(res.body.message).toEqual('Role validation failed');
          expect(res.body.errors.title.message)
            .toContain('`random` is not a valid enum value for path `title`.');
          done();
        });
      });
      
      it('returns all roles with get request to users/roles', function(done){
        request
        .get('/users/roles')
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toEqual(200);
          expect(res.body).toBeDefined();
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(2);
          done();
        });
      });
    });

      // TESTS FOR DOCUMENTs CONTROLLER
     describe('Document suite', function() {
      it('allows only authenticated users to create documents', function(done) {
        request
        .post('/documents')
        .send({
          owner: 'admin',
          title: 'Admin\'s document',
          content: 'This document belongs to the adminstrator and can only be viewed by admins',
          access: 0
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(res.status).toEqual(401);
          expect(res.body).toBeDefined();
          expect(res.body.error).toBeDefined();
          expect(res.body.error).toBe('You are not authenticated');
          done();
        });
      });
       
      it('allows only authenticated users to view documents', function(done) {
        request
        .get('/documents')
        .set('Accept', 'application/json')
        .end(function(err, res) {
          console.log('res.body:', res.body);
          expect(res.status).toEqual(401);
          expect(res.body.error).toBeDefined();
          expect(res.body.error).toBe('You are not authenticated');
          done();
        });
      });

      it('Document created must have a title and content', function(done) {
        request
        .post('/documents')
        .send({
          owner: 'admin',
          access: 0
        })
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(err).toBeDefined();
          expect(res.body).toBeDefined();
          expect(res.body.errors).toBeDefined();
          expect(res.body.message).toBe('Document validation failed');
          expect(res.body.name).toBe('ValidationError');
          done();
        });
      });

      it('creates a document successfully', function(done) {
        request
        .post('/documents')
        .send({
          owner: 'admin',
          title: 'Create Test Document',
          content: 'This document has been created by a test spec',
          access: 0
        })
        .set('Accept', 'application/json')
        .set('x-access-token', token)
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.body).toBeDefined();
          expect(res.status).toBe(200);
          expect(res.body.doc.dateCreated).toBeDefined();
          expect(res.body.doc.title).toEqual('Create Test Document');
          expect(res.body.message).toEqual('Document created successfully');
          done();
        });
      });

      it('returns all documents if user is admin', function(done) {
         helper.adminLogin(function(body){
          let adminToken = body.token;
          request
          .get('/documents')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(err, res) {
            expect(err).toBeNull();
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toEqual(4);
            done();
          });
        });
      });

      it('returns a token on user login', function(done) {
        helper.viewerLogin(function(body){
          let viewerToken = body.token;
          request
          .get('/documents')
          .set('x-access-token', viewerToken)
          .set('Accept', 'application/json')
          .end(function(err, res) {
            expect(err).toBeNull();
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).not.toEqual(4);
            done();
          });
        });
      });

     xit('returns all documents if token is provided', function(done) {
       request
        .get('/documents')
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toEqual(200);
          expect(res.body).toBeDefined();
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(2);
          done();
        });
       });

      xit('creates a user successfully', function(done) {
        request
        .post('/documents')
        .send({
          email: 'me@you.com',
          name: 'Me You',
          password: 'abc123'
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toEqual(200);
          done();
        });
      });
     });
  });
})();



