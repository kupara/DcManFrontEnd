(() => {
  'use strict';

  let AppConstants = require('../constants/AppConstants'),
    Dispatcher = require('../dispatcher/AppDispatcher'),
    BaseStore = require('./BaseStore'),
    assign = require('object-assign');

  let RoleStore = assign({}, BaseStore, {
    createdRole: null,
    roles: null,

    setRoles(roles) {
      this.roles = roles;
      this.emitChange();
    },

    getRoles() {
      return this.roles;
    },

    setCreatedRole(role) {
      this.createdRole = role;
      this.emitChange();
    },

    getCreatedRole() {
      return this.createdRole;
    }

  });

  Dispatcher.register((action) => {
    switch (action.actionType) {
      case AppConstants.CREATE_ROLE:
        RoleStore.setCreatedRole(action.data);
        break;
      case AppConstants.GET_ROLES:
        RoleStore.setRoles(action.data);
        break;
      default:
        // no default action
    }
    return true;
  });

  module.exports = RoleStore;

})();