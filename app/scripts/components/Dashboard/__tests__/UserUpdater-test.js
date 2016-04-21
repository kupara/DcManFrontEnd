import React from 'react';
import {browserHistory} from 'react-router';
import expect from 'expect';
import sinon from 'sinon';
import {mount,shallow} from 'enzyme';
import * as UserActions from '../../../actions/UserActions';
import UserStore from '../../../stores/UserStore';
import UserUpdater from '../UserUpdater.jsx';

describe('User Updater Component Tests', function() {
  describe('Component Rendering Tests', function() {
    var component, user;
    beforeEach(() => {
      user = {
        email: 'edwin@kups.com',
        password: 'edwin',
        role: 'user'
      }
      component = shallow(<UserUpdater user= {user}/>);
    });

    it('renders the component correctly', function() {
      sinon.stub(UserActions, 'getUser').returns(true);
      expect(component.hasClass('row')).toBe(true);
      expect(component.find('.input-field').length).toEqual(3);
      component.unmount();
      UserActions.getUser.restore();
    });

    it('initializes with the correct state', function() {
      sinon.stub(UserActions, 'session').returns(true);
      sinon.stub(UserActions, 'getUser').returns({});
      expect(component.state().user).toEqual(user);
      component.unmount();
      UserActions.session.restore();
      UserActions.getUser.restore();
    });
  });

  describe('Component LifeCycle Tests', function() {
    var component, user;
    beforeEach(() => {
      user = {
        email: 'edwin@kups.com',
        password: 'edwin',
        role: 'user'
      }
      component = mount(<UserUpdater user= {user}/>);
    });

    it('Calls componentWillMount', function() {
      sinon.spy(UserUpdater.prototype, 'componentWillMount');
      sinon.spy(UserStore, 'addChangeListener');
      user = {
        email: 'edwin@kups.com',
        password: 'edwin',
        role: 'user'
      }
      component = mount(<UserUpdater user= {user}/>);
      expect(UserUpdater.prototype.componentWillMount.called).toBe(true);
      expect(UserStore.addChangeListener.called).toBe(true);
      UserUpdater.prototype.componentWillMount.restore();
      UserStore.addChangeListener.restore();
      component.unmount();
    });

    it('Calls componentWillUnmount', function() {
      sinon.spy(UserUpdater.prototype, 'componentWillUnmount');
      sinon.spy(UserStore, 'removeChangeListener');
      component.unmount();
      expect(UserUpdater.prototype.componentWillUnmount.called).toBe(true);
      expect(UserStore.removeChangeListener.called).toBe(true);
      UserUpdater.prototype.componentWillUnmount.restore();
      UserStore.removeChangeListener.restore();
    });
  });

  describe('Component Method Tests', function() {
    window.Materialize = {};
    var component;
    beforeEach(function() {
      window.Materialize.toast = sinon.spy();
      var user = {
        email: 'edwin@kups.com',
        password: 'edwin',
        role: 'user'
      }
      let changeRole = function(){};
      component = mount(<UserUpdater changeRole={changeRole} user={user}/>);
    });

    afterEach(function() {
      component.unmount();
    });

    it('handleUserUpdate no error', function() {
      sinon.stub(UserActions, 'getUser').returns({});
      let instance = component.instance();
      let data = {
        user: {
          password: 'er3wrfaasr3wrsfaf'
        },
        message: 'update success '
      };
      UserStore.setUpdateResult(data);
      sinon.spy(instance, 'handleUserUpdate');
      sinon.spy(UserStore, 'getUpdateResult');
      sinon.spy(localStorage, 'getItem');
      instance.handleUserUpdate();
      expect(UserStore.getUpdateResult.called).toBe(true);
      expect(window.Materialize.toast.withArgs(data.message).called).toBe(true);
      expect(localStorage.getItem.withArgs('token').called).toBe(true);
      instance.handleUserUpdate.restore();
      UserStore.getUpdateResult.restore();
      UserActions.getUser.restore();
      localStorage.getItem.restore();
    });

    it('handleSignIn invalid password/username', function() {
      sinon.stub(UserActions, 'getUser').returns({});
      let instance = component.instance();
      let data = {
        error: {
          message: 'update error'
        }
      };
      UserStore.setUpdateResult(data);
      sinon.spy(instance, 'handleUserUpdate');
      sinon.spy(UserStore, 'getUpdateResult');
      sinon.spy(localStorage, 'getItem');
      instance.handleUserUpdate();
      expect(UserStore.getUpdateResult.called).toBe(true);
      expect(window.Materialize.toast.withArgs(data.message).called).toBe(true);
      expect(localStorage.getItem.withArgs('token').called).toBe(true);
      instance.handleUserUpdate.restore();
      UserStore.getUpdateResult.restore();
      UserActions.getUser.restore();
      localStorage.getItem.restore();
    });

    it('should call handleSubmit with Updated data', function() {
      sinon.stub(UserActions, 'updateUser').returns({});
      let instance = component.instance();
      component.setState({
        user: {
          email: 'eddu@email.com',
          password: 'password',
          role: 'user'
        }
      });
      // simulate the Update event
      let updateEvent = {
        preventDefault: function() {}
      };
      sinon.spy(instance, 'handleSubmit');
      sinon.spy(updateEvent, 'preventDefault');
      component.find('form').simulate('submit', updateEvent);
      expect(updateEvent.preventDefault.called).toBe(true);
      expect(UserActions.updateUser.called).toBe(true);
      UserActions.updateUser.restore();
    });

    it('should correctly update the state', function() {
      let fieldChangeEvent = {
        target: {
          name: 'email',
          value: 'edwin'
        },
        preventDefault: function() {}
      };
      const instance = component.instance();
      sinon.spy(instance, 'handleFieldChange');
      instance.handleFieldChange(fieldChangeEvent);
      expect(component.state().user[fieldChangeEvent.target.name]).toBe(fieldChangeEvent.target.value);
      instance.handleFieldChange.restore();
    });
  });

});
