import AppConstants from '../constants/AppConstants';
import Dispatcher from '../dispatcher/AppDispatcher';
import BaseStore from './BaseStore';

let createdRole = null,
  roles = null;

class RoleStore extends BaseStore {
  constructor() {
    super();
  }

  setRoles(role) {
    roles = role;
    this.emitChange();
  }

  getRoles() {
    return roles;
  }

  setCreatedRole(role) {
    createdRole = role;
    this.emitChange();
  }

  getCreatedRole() {
    return createdRole;
  }
}

let roleStore = new RoleStore();

roleStore.dispatchToken = Dispatcher.register(action => {
  switch (action.actionType) {
    case AppConstants.CREATE_ROLE:
      roleStore.setCreatedRole(action.data);
      break;
    case AppConstants.GET_ROLES:
      roleStore.setRoles(action.data);
      break;
    default:
      return true;
  }

});

export default roleStore;
