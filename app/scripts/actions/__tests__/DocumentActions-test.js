'use strict';

import sinon from 'sinon';
import expect from 'expect';
import AppConstants from '../../constants/AppConstants';
import BaseActions from '../BaseActions';
import * as DocumentActions from '../DocumentActions';

describe('DocumentActions', function() {
  let testToken = 'thistoken.isusedfor.testingActions',
    testDoc = {
      title: 'Test',
      content: 'To be tested'
    },
    userId = '1',
    docId = '2';

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
    it('createDoc', function() {
      DocumentActions.createDoc(testDoc, testToken);
      expect(BaseActions.post.withArgs(
        '/documents',
        testDoc,
        AppConstants.CREATE_DOC,
        testToken
      ).called).toBe(true);
    });

    it('getUserDocs', function() {
      DocumentActions.getUserDocs(userId, testToken);
      expect(BaseActions.get.withArgs(
        `/users/${userId}/documents`,
        AppConstants.USER_DOCS,
        testToken
      ).called).toBe(true);
    });

    it('getDoc', function() {
      DocumentActions.getDoc(docId, testToken);
      expect(BaseActions.get.withArgs(
        `/documents/${docId}`,
        AppConstants.GET_ONE_DOC,
        testToken
      ).called).toBe(true);
    });

    it('getAllDocs', function() {
      DocumentActions.getAllDocs(testToken);
      expect(BaseActions.get.withArgs(
        '/documents',
        AppConstants.GET_ALL_DOCS,
        testToken
      ).called).toBe(true);
    });

    it('deleteDoc', function() {
      DocumentActions.deleteDoc(docId, testToken);
      expect(BaseActions.delete.withArgs(
        `/documents/${docId}`,
        AppConstants.DELETE_DOC,
        testToken
      ).called).toBe(true);
    });

    it('updateDoc', function() {
      DocumentActions.updateDoc(docId, testDoc, testToken);
      expect(BaseActions.put.withArgs(
        `/documents/${docId}`,
        testDoc,
        AppConstants.UPDATE_DOC,
        testToken
      ).called).toBe(true);
    });
  });
});
