(function() {
  'use strict';

  var supertest = require('supertest');
  var server = require('../dcman');
  //var seeder = require('./helpers/seeder');
  var helper = require('./helpers/login');
  var request = supertest(server);

  describe('User suite', function() {
    var token;

    beforeAll(function(done) {
      require('./helpers/seeder');
      helper.login(function(body) {
        token = body.token;
        done();
      });
    });

    it('user created must have a unique username', function(done) {
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
        expect(err).toBeNull();
        //expect(res.status).toEqual(500);
        expect(res.body).toBeDefined();
        expect(res.body.error).toBeDefined();
        expect(res.body.error.message).toBe('Please select another username');
        done();
      });
    });

    it('password needed during creation', function(done) {
      request
      .post('/users')
      .send({
        email: 'evan@andela.com',
        name: 'Evan Greenlowe'
      })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        expect(err).toBeNull();
        expect(res.body).toBeDefined();
        expect(res.body.errors).toBeDefined();
        expect(res.body.message).toBe('User validation failed');
        done();
      });
    });

    it('returns an error on login failure', function(done) {
      request
      .post('/users/login')
      .send({
        username: 'admin',
        password: 'abc124'
      })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        expect(err).toBeNull();
        expect(res.status).toEqual(500);
        expect(res.body).toBeDefined();
        expect(res.body.error).toBeDefined();
        expect(res.body.error.message).toContain('Invalid password');
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

   xit('returns all users if token is provided', function(done) {
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

    xit('creates a user successfully', function(done) {
      request
      .post('/users')
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
    
//    it('creates a unique user', function() {
//
//    });
//
//    it('creates a user with role defined', function() {
//
//    });
//
//    it('creates a user with both first and last names defined', function() {
//
//    });

  });
})();

