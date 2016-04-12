(() => {
  'use strict';

  const AppConstants = require('../constants/AppConstants'),
    BaseActions  = require('./BaseActions');

  module.exports = {
    login: (user) => {
      BaseActions.post('/users/login', user, AppConstants.USER_SIGNIN);
    },

    logout: (token) => {
      BaseActions.post('/users/logout', null, AppConstants.USER_SIGNOUT, token);
    },

    signup: (user) => {
      BaseActions.post('/users', user, AppConstants.USER_SIGNUP);
    },

    update: (userID, user, token) => {
      BaseActions.put(`/users/${userID}`, user, AppConstants.UPDATE_USER, token);
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
