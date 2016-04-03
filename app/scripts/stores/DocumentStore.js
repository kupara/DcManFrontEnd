(() => {
  'use strict';

  const AppConstants = require('../constants/AppConstants'),
    Dispatcher = require('../dispatcher/AppDispatcher'),
    BaseStore = require('./BaseStore'),
    assign = require('object-assign');

  let DocumentStore = assign({}, BaseStore, {
    document: null,
    documents: null,
    docCreateResult: null,
    docDeleteResult: null,
    docEditResult: null,

    setDocs(docs) {
      this.documentss = docs;
      this.emitChange('fetchDocs');
    },

    getDocs() {
      return this.documents;
    },

    setDoc(doc) {
      this.document = doc;
      this.emitChange('getDoc');
    },

    getDoc() {
      return this.document;
    },

    setDocCreateResult(result) {
      this.docCreateResult = result;
      this.emitChange();
    },

    getDocCreateResult() {
      return this.docCreateResult;
    },

    setDocEditResult(result) {
      this.docEditResult = result;
      this.emitChange('editDoc');
    },

    getDocEditResult() {
      return this.docEditResult;
    },

    setDocDeleteResult(result) {
      this.docDeleteResult = result;
      this.emitChange();
    },

    getDocDeleteResult() {
      return this.docDeleteResult;
    }
  });

  Dispatcher.register(function(action) {
    switch (action.actionType) {
      case AppConstants.USER_DOCS:
        DocumentStore.setDocs(action.data);
        break;
      case AppConstants.CREATE_DOC:
        DocumentStore.setDocCreateResult(action.data);
        break;
      case AppConstants.DELETE_DOC:
        DocumentStore.setDocDeleteResult({
          data: action.data,
          statusCode: action.statusCode
        });
        break;
      case AppConstants.EDIT_DOC:
        DocumentStore.setDocEditResult({
          data: action.data,
          statusCode: action.statusCode
        });
        break;
      case AppConstants.GET_DOC:
        DocumentStore.setDoc(action.data);
        break;
      default:
        // no default action
    }

    return true;
  });

  module.exports = DocumentStore;
})();