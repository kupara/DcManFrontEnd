(function () {
  'use strict';

  const supertest = require('supertest'),
    server = require('../server'),
    request = supertest(server),
    helper = require('./helpers/helper');

  let adminToken, adminId, userId, userToken;
  beforeAll(function (done) {
    helper.adminLogin(function (body) {
      adminToken = body.token;
      adminId = body.user._id;
      done();
    });
     helper.userLogin(function (body) {
      userToken = body.token;
      userId = body.user._id;
      done();
    });
  });

  describe('User suite', function () {
    it('creates a user successfully and returns a token', function (done) {
      request
        .post('/users')
        .send({
          username: 'kups',
          email: 'edwin@kups.com',
          firstname: 'Edwin',
          lastname: 'Kups',
          role: 'admin',
          password: 'abc123'
        })
        .set('Accept', 'application/json')
        .end(function (err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.body.message).toBe('User created successfully');
          expect(res.body.user.username).toBe('kups');
          expect(res.body.user._id).toBeDefined();
          expect(res.body.token).toBeDefined();
          done();
        });
    });

    it('returns an error on duplicate username', function (done) {
      request
        .post('/users')
        .send({
          username: 'adminUser',
          email: 'test@email.com',
          password: 'adm123',
          name: {
            first: 'Test',
            last: 'User'
          }
        })
        .set('Accept', 'application/json')
        .end(function (err, res) {
          expect(res.body).toBeDefined();
          expect(res.status).toBe(200);
          expect(res.body.error).toBeDefined();
          expect(res.body.error.message).toBe('Please select another username');
          done();
        });
    });

    it('requires a password during creation', function (done) {
      request
        .post('/users')
        .send({
          email: 'kups@andela.com',
          name: 'Kups Delacruz'
        })
        .set('Accept', 'application/json')
        .end(function (err, res) {
          expect(res.body).toBeDefined();
          expect(res.body.errors).toBeDefined();
          expect(res.body.message).toBe('User validation failed');
          done();
        });
    });

    it('requires a both last name and username during creation', function (done) {
      request
        .post('/users')
        .send({
          username: 'wekesa',
          email: 'test@email.com',
          password: 'abc123'
        })
        .set('Accept', 'application/json')
        .end(function (err, res) {
          expect(res.body).toBeDefined();
          expect(res.body.errors).toBeDefined();
          expect(res.body.message).toBe('User validation failed');
          done();
        });
    });

    it('returns an error on invalid password when logging in', function (done) {
      request
        .post('/users/login')
        .send({
          username: 'adminUser',
          password: 'abc124'
        })
        .set('Accept', 'application/json')
        .end(function (err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(401);
          expect(res.body).toBeDefined();
          expect(res.body.error).toBeDefined();
          expect(res.body.error.message).toContain('Invalid password');
          done();
        });
    });

    it('returns an error on invalid username when logging in', function (done) {
      request
        .post('/users/login')
        .send({
          username: 'admins',
          password: 'adm123'
        })
        .set('Accept', 'application/json')
        .end(function (err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(401);
          expect(res.body).toBeDefined();
          expect(res.body.error).toBeDefined();
          expect(res.body.error.message).toContain('Wrong username');
          done();
        });
    });

    it('returns a token on user login', function (done) {
      request
        .post('/users/login')
        .send({
          username: 'adminUser',
          password: 'admin123'
        })
        .set('Accept', 'application/json')
        .end(function (err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.body).toBeDefined();
          expect(res.body.token).toBeDefined();
          done();
        });
    });

    it('returns one user provided an id', function (done) {
      request
        .get('/users/' + adminId)
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end(function (err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.body).toBeDefined();
          expect(Array.isArray(res.body)).toBeFalsy();
          expect(res.body.username).toBe('adminUser');
          done();
        });
    });

    it('updates the user whose id is provided', function (done) {
      request
        .put('/users/' + adminId)
        .set('x-access-token', adminToken)
        .send({
          email: 'admin@admin.com',
          name: {
            first: 'Admin'
          }
        })
        .set('Accept', 'application/json')
        .end(function (err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.body.message).toBe('User updated successfully');
          done();
        });
    });

    it('returns an error when updating a non-existent user', function (done) {
      request
        .put('/users/56e71e392100143743ae95e5')
        .set('x-access-token', adminToken)
        .send({
          email: 'admin@admin.com',
          name: {
            first: 'Admin'
          }
        })
        .set('Accept', 'application/json')
        .end(function (err, res) {
          expect(res.status).toBe(404);
          expect(res.body.error).toBeDefined();
          expect(res.body.error.message).toBe('User not found');
          done();
        });
    });

    it('successfully logs a user out', function (done) {
      request
        .get('/users/logout')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end(function (err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.body).toBeDefined();
          expect(res.body.message).toBe('Successfully logged out');
          done();
        });
    });

    it('successfully deletes a user', function (done) {
      helper.createUser(function(body) {
        let delete_token = body.token;
        let delete_id = body.user._id;
        request
          .delete('/users/' + delete_id)
          .set('x-access-token', delete_token)
          .set('Accept', 'application/json')
          .end(function (err, res) {
            expect(err).toBeNull();
            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
            expect(res.body.message).toBe('User deleted successfully');
            done();
          });
      });
    });

    it('returns the documents belonging to a user', function (done) {
      request
        .get('/users/' + userId + '/documents')
        .set('x-access-token', userToken)
        .set('Accept', 'application/json')
        .end(function (err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.body).toBeDefined();
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(5);
          done();
        });
    });

    it('returns all users if admin token is provided', function (done) {
      request
        .get('/users')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end(function (err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.body).toBeDefined();
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBeGreaterThan(2);
          done();
        });
    });
  });
})();
