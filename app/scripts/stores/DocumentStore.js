import AppConstants from '../constants/AppConstants';
import Dispatcher from '../dispatcher/AppDispatcher';
import BaseStore from './BaseStore';

let document = null,
  userDocuments = null,
  allDocuments = null,
  docCreateResult = null,
  docDeleteResult = null,
  docEditResult = null;

class DocumentStore extends BaseStore {
  constructor() {
    super();
  }

  setUserDocs(docs) {
    userDocuments = docs;
    this.emitChange('getDocs');
  }

  getUserDocs() {
    return userDocuments;
  }

  setDoc(doc) {
    document = doc;
    this.emitChange('getDoc');
  }

  getDoc() {
    return document;
  }

  setAllDocs(docs) {
    allDocuments = docs;
    this.emitChange('allDocs');
  }

  getAllDocs() {
    return allDocuments;
  }

  setDocCreateResult(result) {
    docCreateResult = result;
    this.emitChange();
  }

  getDocCreateResult() {
    return docCreateResult;
  }

  setDocEditResult(result) {
    docEditResult = result;
    this.emitChange('editDoc');
  }

  getDocEditResult() {
    return docEditResult;
  }

  setDocDeleteResult(result) {
    docDeleteResult = result;
    this.emitChange();
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
      docStore.setDocCreateResult(action.data);
      break;
    case AppConstants.DELETE_DOC:
      docStore.setDocDeleteResult({
        data: action.data,
        statusCode: action.statusCode
      });
      break;
    case AppConstants.EDIT_DOC:
      docStore.setDocEditResult({
        data: action.data,
        statusCode: action.statusCode
      });
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

  docStore.emitChange();

});
export default docStore;
