import RoleStore from '../RoleStore';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppConstants from '../../constants/AppConstants';
import expect from 'expect';
import sinon from 'sinon';

describe('RoleStore', function() {
  var spyRegister;

  before(function() {
    sinon.stub(RoleStore, 'emitChange').returns(true);
    spyRegister = sinon.stub(AppDispatcher, 'register');
    sinon.spy(AppDispatcher, 'dispatch');
    spyRegister.onFirstCall().returnsArg(0);
  });

  after(function() {
    AppDispatcher.dispatch.restore();
    spyRegister.restore();
  });

  it('Handles setRoles', function() {
    sinon.spy(RoleStore, 'setRoles');
    var result = {
      actionType: AppConstants.GET_ROLES,
      data: 'Test Role'
    };
    AppDispatcher.dispatch(result);
    expect(RoleStore.setRoles.called).toBe(true);
    const roles = RoleStore.getRoles();
    expect(roles).toBe(result.data);
  });

  it('Handles setCreatedRole', function() {
    sinon.spy(RoleStore, 'setCreatedRole');
    var result = {
      actionType: AppConstants.CREATE_ROLE,
      data: 'Another One'
    };
    AppDispatcher.dispatch(result);
    expect(RoleStore.setCreatedRole.called).toBe(true);
    const roles = RoleStore.getCreatedRole();
    expect(roles).toBe(result.data);
  });

});
