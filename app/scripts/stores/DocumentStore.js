import AppConstants from '../constants/AppConstants';
import Dispatcher from '../dispatcher/AppDispatcher';
import BaseStore from './BaseStore';

let document = null,
  userDocuments = null,
  allDocuments = null,
  docCreationResult = null,
  docDeleteResult = null,
  docUpdateResult = null;

class DocumentStore extends BaseStore {
  constructor() {
    super();
  }

  setUserDocs(docs) {
    userDocuments = docs;
    this.emitChange('getUserDocs');
  }

  getUserDocs() {
    return userDocuments;
  }

  setDoc(doc) {
    document = doc;
    this.emitChange('setDoc');
  }

  getDoc() {
    return document;
  }

  setAllDocs(docs) {
    allDocuments = docs;
    this.emitChange('setDocs');
  }

  getAllDocs() {
    return allDocuments;
  }

  setDocCreationResult(result) {
    docCreationResult = result;
    this.emitChange('docCreation');
  }

  getDocCreationResult() {
    return docCreationResult;
  }

  setDocUpdateResult(result) {
    docUpdateResult = result;
    this.emitChange('docUpdate');
  }

  getDocUpdateResult() {
    return docUpdateResult;
  }

  setDocDeleteResult(result) {
    docDeleteResult = result;
    this.emitChange('docDelete');
  }

  getDocDeleteResult() {
    return docDeleteResult;
  }
}

let docStore = new DocumentStore();

docStore.dispatchToken = Dispatcher.register(action => {
  switch (action.actionType) {
    case AppConstants.USER_DOCS:
      docStore.setUserDocs(action.data);
      break;
    case AppConstants.CREATE_DOC:
      docStore.setDocCreationResult(action.data);
      break;
    case AppConstants.DELETE_DOC:
      docStore.setDocDeleteResult(action.data);
      break;
    case AppConstants.UPDATE_DOC:
      docStore.setDocUpdateResult(action.data);
      break;
    case AppConstants.GET_ONE_DOC:
      docStore.setDoc(action.data);
      break;
    case AppConstants.GET_ALL_DOCS:
      docStore.setAllDocs(action.data);
      break;
    default:
      return true;
  }
});

export default docStore;
