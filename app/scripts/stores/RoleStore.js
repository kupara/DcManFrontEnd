import AppConstants from '../constants/AppConstants';
import Dispatcher from '../dispatcher/AppDispatcher';
import BaseStore from './BaseStore';

let createdRole = null,
  roles = null;

class RoleStore extends React.Component {
  setRoles(roles) {
    this.roles = roles;
    this.emitChange();
  }

  getRoles() {
    return this.roles;
  }

  setCreatedRole(role) {
    this.createdRole = role;
    this.emitChange();
  }

  getCreatedRole() {
    return this.createdRole;
  }

}

let roleStore = new RoleStore();

roleStore.dispatchToken = Dispatcher.register(action => {
  switch (action.actionType) {
    case AppConstants.CREATE_ROLE:
      RoleStore.setCreatedRole(action.data);
      break;
    case AppConstants.GET_ROLES:
      RoleStore.setRoles(action.data);
      break;
    default:
      return true;
  }

  roleStore.emitChange();

});

export default roleStore;
