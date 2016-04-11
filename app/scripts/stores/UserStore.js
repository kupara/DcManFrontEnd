import AppConstants from '../constants/AppConstants';
import Dispatcher from '../dispatcher/AppDispatcher';
import BaseStore from './BaseStore';


let users = null,
  session = null,
  signInResult = null,
  signOutResult = null,
  signUpResult = null,
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

  setSession(result) {
    console.log(result)
    session = result;
    this.emitChange('session');
  }

  getSession() {
    return session;
  }

  setSignInResult(signIn) {
    signInResult = signIn;
    this.emitChange('signIn');
  }

  getSignInResult() {
    return signInResult;
  }

  setSignOutResult(signOut) {
    signOutResult = signOut;
    this.emitChange();
  }

  getSignOutResult() {
    return signOutResult;
  }

  setSignUpResult(signUp) {
    signUpResult = signUp;
    this.emitChange('signUp');
  }

  getSignUpResult() {
    return signUpResult;
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
    case AppConstants.USER_SIGNIN:
      userStore.setSignInResult(action.data);
      break;
    case AppConstants.USER_SIGNOUT:
      userStore.setSignOutResult(action.data);
      break;
    case AppConstants.USER_SIGNUP:
      userStore.setSignUpResult(action.data);
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
