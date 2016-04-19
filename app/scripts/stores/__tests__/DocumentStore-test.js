import AppDispatcher from '../../dispatcher/AppDispatcher';
import DocumentStore from '../DocumentStore';
import AppConstants from '../../constants/AppConstants';
import expect from 'expect';
import sinon from 'sinon';

describe('DocumentStore', function() {
  var spyRegister;

  before(function() {
    sinon.stub(DocumentStore, 'emitChange').returns(true);
    sinon.spy(AppDispatcher, 'dispatch');
    spyRegister = sinon.stub(AppDispatcher, 'register');
    spyRegister.onFirstCall().returnsArg(0);
  });

  after(function() {
    AppDispatcher.dispatch.restore();
    AppDispatcher.register.restore();
    spyRegister.restore();
  });

  it('Sets documents belonging to a user', function() {
    sinon.spy(DocumentStore, 'setUserDocs');
    var result = {
      actionType: AppConstants.USER_DOCS,
      data: 'Test Doc'
    };
    AppDispatcher.dispatch(result);
    expect(DocumentStore.setUserDocs.called).toBe(true);
    const userDocs = DocumentStore.getUserDocs();
    expect(userDocs).toBe(result.data);
  });

  it('Sets a document belonging to a user', function() {
    sinon.spy(DocumentStore, 'setDoc');
    var result = {
      actionType: AppConstants.GET_ONE_DOC,
      data: 'Test Doc'
    };
    AppDispatcher.dispatch(result);
    expect(DocumentStore.setDoc.called).toBe(true);
    const userDoc = DocumentStore.getDoc();
    expect(userDoc).toBe(result.data);
  });

  it('Sets all documents accessible by a user', function() {
    sinon.spy(DocumentStore, 'setAllDocs');
    var result = {
      actionType: AppConstants.GET_ALL_DOCS,
      data: 'Test Doc'
    };
    AppDispatcher.dispatch(result);
    expect(DocumentStore.setAllDocs.called).toBe(true);
    const userDoc = DocumentStore.getAllDocs();
    expect(userDoc).toBe(result.data);
  });

  it('handles document creation appropriately', function() {
    sinon.spy(DocumentStore, 'setDocCreationResult');
    var result = {
      actionType: AppConstants.CREATE_DOC,
      data: 'Test Doc'
    };
    AppDispatcher.dispatch(result);
    expect(DocumentStore.setDocCreationResult.called).toBe(true);
    const myDoc = DocumentStore.getDocCreationResult();
    expect(myDoc).toBe(result.data);
  });

  it('handles document update appropriately', function() {
    sinon.spy(DocumentStore, 'setDocUpdateResult');
    var result = {
      actionType: AppConstants.UPDATE_DOC,
      data: 'Test Doc'
    };
    AppDispatcher.dispatch(result);
    expect(DocumentStore.setDocUpdateResult.called).toBe(true);
    const newDoc = DocumentStore.getDocUpdateResult();
    expect(newDoc).toEqual(result.data);
  });

  it('handles document deletion appropriately', function() {
    sinon.spy(DocumentStore, 'setDocDeleteResult');
    var result = {
      actionType: AppConstants.DELETE_DOC,
      data: 'Test Doc'
    };
    AppDispatcher.dispatch(result);
    expect(DocumentStore.setDocDeleteResult.called).toBe(true);
    const status = DocumentStore.getDocDeleteResult();
    expect(status).toEqual(result.data);
  });

});
