import AppConstants from '../constants/AppConstants';
import Dispatcher from '../dispatcher/AppDispatcher';
import BaseStore from './BaseStore';


let users = null,
  session = null,
  loginResult = null,
  logoutResult = null,
  signupResult = null,
  updateResult = null;

class UserStore extends BaseStore {

  constructor() {
    super();
  }
  getUsers() {
    return users;
  }

  setUsers(user) {
    users = user;
    this.emitChange();
  }

  setSession(session) {
    this.session = session;
    this.emitChange('session');
  }

  getSession() {
    return session;
  }

  setLoginResult(login) {
    loginResult = login;
    this.emitChange('login');
  }

  getLoginResult() {
    return loginResult;
  }

  setLogoutResult(logout) {
    logoutResult = logout;
    this.emitChange();
  }

  getLogoutResult() {
    return ogoutResult;
  }

  setSignupResult(signup) {
    signupResult = signup;
    this.emitChange('signup');
  }

  getSignupResult() {
    return signupResult;
  }

  setUpdateResult(update) {
    updateResult = update;
    this.emitChange('update');
  }

  getUpdateResult() {
    return updateResult;
  }
}

let userStore = new UserStore();

userStore.dispatchToken = Dispatcher.register(action => {
  switch (action.actionType) {
    case AppConstants.USER_LOGIN:
      userStore.setLoginResult(action.data);
      break;
    case AppConstants.USER_LOGOUT:
      userStore.setLogoutResult(action.data);
      break;
    case AppConstants.USER_SIGNUP:
      userStore.setSignupResult(action.data);
      break;
    case AppConstants.USER_SESSION:
      userStore.setSession(action.data);
      break;
    case AppConstants.USER_UPDATE:
      userStore.setUpdateResult(action.data);
      break;
    case AppConstants.GET_USERS:
      userStore.setUsers(action.data);
      break;
    default:
      return;
  }

  userStore.emitChange();
});


export default userStore;
