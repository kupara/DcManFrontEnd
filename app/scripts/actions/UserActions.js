import AppConstants from '../constants/AppConstants';
import BaseActions from './BaseActions';

export function signIn(user) {
  BaseActions.post('/users/login', user, AppConstants.USER_SIGNIN);
}

export function signOut(token) {
  BaseActions.post('/users/logout', null, AppConstants.USER_SIGNOUT, token);
}

export function signUp(user) {
  BaseActions.post('/users', user, AppConstants.USER_SIGNUP);
}

export function updateUser(userID, user, token) {
  BaseActions.put(`/users/${userID}`, user, AppConstants.UPDATE_USER, token);
}

export function getUser(userID, token) {
  BaseActions.get(`/users/${userID}`, AppConstants.GET_USER, token);
}

export function session() {
  let token = window.localStorage.getItem('token');
  BaseActions.get('/users/session', AppConstants.USER_SESSION, token);
}

export function fetchAllUsers(token) {
  BaseActions.get('/users', AppConstants.GET_USERS, token);
}
