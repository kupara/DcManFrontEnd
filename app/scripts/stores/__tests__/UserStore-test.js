import AppDispatcher from '../../dispatcher/AppDispatcher';
import UserStore from '../UserStore';
import AppConstants from '../../constants/AppConstants';
import expect from 'expect';
import sinon from 'sinon';

describe('UserStore Tests', function() {
  var spyRegister;

  before(function() {
    sinon.stub(UserStore, 'emitChange').returns(true);
    spyRegister = sinon.stub(AppDispatcher, 'register');
    sinon.spy(AppDispatcher, 'dispatch');
    spyRegister.onFirstCall().returnsArg(0);
  });

  after(function() {
    AppDispatcher.dispatch.restore();
    spyRegister.restore();
  });

  it('Sets all users', function() {
    sinon.spy(UserStore, 'setUsers');
    var result = {
      data: 'Am a User',
      actionType: AppConstants.GET_USERS
    };
    AppDispatcher.dispatch(result);
    expect(UserStore.setUsers.called).toBe(true);
    const users = UserStore.getUsers();
    expect(users).toBe(result.data);
  });

  it('Sets a single user', function() {
    sinon.spy(UserStore, 'setUser');
    var result = {
      data: 'Am a User',
      actionType: AppConstants.GET_USER
    };
    AppDispatcher.dispatch(result);
    expect(UserStore.setUser.called).toBe(true);
    const user = UserStore.getUser();
    expect(user).toBe(result.data);
  });

  it('saves the user session', function() {
    sinon.spy(UserStore, 'setSession');
    var result = {
      actionType: AppConstants.USER_SESSION,
      data: {
        loggedIn: true
      }
    };
    AppDispatcher.dispatch(result);
    expect(UserStore.setSession.called).toBe(true);
    const session = UserStore.getSession();
    expect(session).toBe(result.data);
  });

  it('saves the user signIn result', function() {
    sinon.spy(UserStore, 'setSignInResult');
    var result = {
      actionType: AppConstants.USER_SIGNIN,
      data: 'success'
    };
    AppDispatcher.dispatch(result);
    expect(UserStore.setSignInResult.called).toBe(true);
    const status = UserStore.getSignInResult();
    expect(status).toBe(result.data);
  });

  it('saves the user logout result', function() {
    sinon.spy(UserStore, 'setSignOutResult');
    var result = {
      actionType: AppConstants.USER_SIGNOUT,
      data: 'success'
    };
    AppDispatcher.dispatch(result);
    expect(UserStore.setSignOutResult.called).toBe(true);
    const status = UserStore.getSignOutResult();
    expect(status).toBe(result.data);
  });

  it('saves the user signUp result', function() {
    sinon.spy(UserStore, 'setSignUpResult');
    var result = {
      actionType: AppConstants.USER_SIGNUP,
      data: 'success'
    };
    AppDispatcher.dispatch(result);
    expect(UserStore.setSignUpResult.called).toBe(true);
    const status = UserStore.getSignUpResult();
    expect(status).toBe(result.data);
  });

  it('saves the user update result', function() {
    sinon.spy(UserStore, 'setUpdateResult');
    var result = {
      actionType: AppConstants.UPDATE_USER,
      data: 'success'
    };
    AppDispatcher.dispatch(result);
    expect(UserStore.setUpdateResult.called).toBe(true);
    const update = UserStore.getUpdateResult();
    expect(update).toBe(result.data);
  });

});
