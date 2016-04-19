'use strict';

import sinon from 'sinon';
import expect from 'expect';
import AppConstants from '../../constants/AppConstants';
import BaseActions from '../BaseActions';
import * as UserActions from '../UserActions';

describe('UserActions', function() {
  let testToken = 'thistoken.isusedfor.testingActions',
    testUser = {
      username: 'Test',
      email: 'email@user.com'
    },
    userId = '1';
  beforeEach(function() {
    sinon.stub(BaseActions, 'get').returns(true);
    sinon.stub(BaseActions, 'post').returns(true);
    sinon.stub(BaseActions, 'put').returns(true);
    sinon.stub(BaseActions, 'delete').returns(true);
  });

  afterEach(function() {
    BaseActions.get.restore();
    BaseActions.post.restore();
    BaseActions.put.restore();
    BaseActions.delete.restore();
  });

  describe('calls BaseActions', function() {
    it('signIn', function() {
      UserActions.signIn(testUser);
      expect(BaseActions.post.withArgs(
        '/users/login',
        testUser,
        AppConstants.USER_SIGNIN,
      ).called).toBe(true);
    });

    it('signOut', function() {
      UserActions.signOut(testToken);
      expect(BaseActions.post.withArgs(
        '/users/logout',
        null,
        AppConstants.USER_SIGNOUT,
        testToken
      ).called).toBe(true);
    });

    it('signUp', function() {
      UserActions.signUp(testUser);
      expect(BaseActions.post.withArgs(
        '/users',
        testUser,
        AppConstants.USER_SIGNUP
      ).called).toBe(true);
    });

    it('updateUser', function() {
      UserActions.updateUser(userId, testUser, testToken);
      expect(BaseActions.put.withArgs(
        `/users/${userId}`,
        testUser,
        AppConstants.UPDATE_USER,
        testToken
      ).called).toBe(true);
    });
  });
});
