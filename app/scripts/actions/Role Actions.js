import AppConstants from '../constants/AppConstants';
import BaseActions from './BaseActions';

export function create(data, token) {
  BaseActions.post('/users/roles', data, AppConstants.CREATE_ROLE, token);
}

export function getRoles(token) {
  BaseActions.get('/users/roles', AppConstants.GET_ROLES, token);
}
