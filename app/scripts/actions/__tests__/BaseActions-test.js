'use strict';

import sinon from 'sinon';
import expect from 'expect';
import request from 'superagent';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import BaseActions from '../BaseActions.js';

describe('BaseActions Tests', function() {
  let testToken = 'thistoken.isusedfor.testingActions',
    testActionType = 'TEST_TYPE',
    result = {
      body: 'TestResponse'
    },
    testURL = '/api/dcman';

  before(function() {
    sinon.stub(AppDispatcher, 'dispatch').returns(true);
    sinon.stub(request.Request.prototype, 'end', function(callback) {
      callback(null, result);
    });
  });

  after(function() {
    AppDispatcher.dispatch.restore();
    request.Request.prototype.end.restore();
  });

  describe('BaseActions HTTP Methods', function() {
    it('get', function() {
      BaseActions.get(testURL, testActionType, testToken);
      expect(AppDispatcher.dispatch.withArgs(
        {
          actionType: testActionType,
          data: result.body
        }
      ).called).toBe(true);
    });

    it('post', function() {
      BaseActions.post(testURL, result, testActionType, testToken);
      expect(AppDispatcher.dispatch.withArgs(
        {
          actionType: testActionType,
          data: result.body
        }
      ).called).toBe(true);
    });

    it('put', function() {
      BaseActions.put(testURL, result, testActionType, testToken);
      expect(AppDispatcher.dispatch.withArgs(
        {
          actionType: testActionType,
          data: result.body
        }
      ).called).toBe(true);
    });

    it('delete', function() {
      BaseActions.delete(testURL, testActionType, testToken);
      expect(AppDispatcher.dispatch.withArgs(
        {
          actionType: testActionType,
          data: result.body
        }
      ).called).toBe(true);
    });
  });
});
