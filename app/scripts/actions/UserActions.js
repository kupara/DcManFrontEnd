(() => {
  'use strict';

  const AppConstants = require('../constants/AppConstants'),
    BaseActions  = require('./BaseActions');

  module.exports = {
    signIn: (user) => {
      BaseActions.post('/users/login', user, AppConstants.USER_SIGNIN);
    },

    signOut: (token) => {
      BaseActions.post('/users/logout', null, AppConstants.USER_SIGNOUT, token);
    },

    signUp: (user) => {
      BaseActions.post('/users', user, AppConstants.USER_SIGNUP);
    },

    updateUser: (userID, user, token) => {
      BaseActions.put(`/users/${userID}`, user, AppConstants.UPDATE_USER, token);
    },

    getUser: (userID, token) => {
      BaseActions.get(`/users/${userID}`, AppConstants.GET_USER, token);
    },
    session: () => {
      let token = window.localStorage.getItem('token');
      BaseActions.get('/users/session', AppConstants.USER_SESSION, token);
    },

    fetchAllUsers: (token) => {
      BaseActions.get('/users', AppConstants.GET_USERS, token);
    }
  };
})();
