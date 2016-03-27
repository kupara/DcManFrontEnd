(function() {
  'use strict';

  const supertest = require('supertest'),
    server = require('../dcman'),
    request = supertest(server),
    helper = require('./helpers/helper');

  let adminToken, adminId;
  beforeAll(function(done) {
    helper.adminLogin(function(body) {
      adminToken = body.token;
      adminId = body.user._id;
      done();
    });
  });
    
     // TESTS FOR ROLES
  describe('Role suite', function() {
    it('creates a role with a title defined', function(done) {
      request
        .post('/users/roles')
        .send({
          title: 'tester'
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.body).toBeDefined();
          expect(res.body.title).toBe('tester');
          done();
        });
    });

    it('cannot create a role with a duplicate title ', function(done) {
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

    it('cannot create a role whose title isn\'t enumerated', function(done) {
      request
        .post('/users/roles')
        .send({
          title: 'random'
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(res.body.errors).toBeDefined();
          expect(res.body.name).toBe('ValidationError');
          expect(res.body.message).toBe('Role validation failed');
          expect(res.body.errors.title.message)
            .toContain('`random` is not a valid enum value for path `title`.');
          done();
        });
    });

    it('returns all roles with get request to users/roles', function(done) {
      request
        .get('/users/roles')
        .set('Accept', 'application/json')
        .end(function(err, res) {
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