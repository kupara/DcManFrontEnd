(() => {
  'use strict';

  let AppConstants = require('../constants/AppConstants'),
    BaseActions  = require('./BaseActions');

  module.exports = {
    createDoc: (body, token) => {
      BaseActions.post(
        '/documents',
        body,
        AppConstants.CREATE_DOC,
        token
      );
    },

    getUserDocs: (userId, token) => {
      BaseActions.get(
        `/users/${userId}/documents`,
        AppConstants.USER_DOCS,
        token
      );
    },

    fetchDoc: (docId, token) => {
      BaseActions.get(
        `/documents/${docId}`,
        AppConstants.GET_DOC,
        token
      );
    },

    deleteDoc: (docID, token) => {
      BaseActions.delete(
        `/documents/${docID}`,
        AppConstants.DELETE_DOC,
        token
      );
    },

    editDoc: (docID, updatedDoc, token) => {
      BaseActions.put(
        `/documents/${docID}`,
        updatedDoc,
        AppConstants.EDIT_DOC,
        token
      );
    }
  };
})();