import AppConstants from '../constants/AppConstants';
import Dispatcher from '../dispatcher/AppDispatcher';
import BaseStore from './BaseStore';

let document = null,
  documents = null,
  docCreateResult = null,
  docDeleteResult = null,
  docEditResult = null;

class DocumentStore extends BaseStore {
  constructor() {
    super();
  }

  setDocs(docs) {
    documents = docs;
    this.emitChange('fetchDocs');
  }

  getDocs() {
    return documents;
  }

  setDoc(doc) {
    document = doc;
    this.emitChange('getDoc');
  }

  getDoc() {
    return document;
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
      docStore.setDocs(action.data);
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
    case AppConstants.GET_DOC:
      docStore.setDoc(action.data);
      break;
    default:
      return true;
  }

  docStore.emitChange();

});
export default docStore;
