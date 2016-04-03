(() => {
  'use strict';

  const AppConstants = require('../constants/AppConstants'),
    BaseActions  = require('./BaseActions');

  module.exports = {
    create: (data, token) => {
      BaseActions.post('/users/roles', data, AppConstants.CREATE_ROLE, token);
    },

    getRoles: (token) => {
      BaseActions.get('/users/roles', AppConstants.GET_ROLES, token);
    }
  };
})();