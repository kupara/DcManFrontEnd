import React from 'react';
import {browserHistory} from 'react-router';
import expect from 'expect';
import sinon from 'sinon';
import {mount,shallow} from 'enzyme';
import * as UserActions from '../../../actions/UserActions';
import UserStore from '../../../stores/UserStore';
import UserInfo from '../UserInfo.jsx';
import UpdaterModal from '../UpdaterModal.jsx';

describe('UserInfo Component Tests', function() {
  describe('Component Rendering Tests', function() {
    it('renders the component correctly', function() {
      sinon.stub(UserActions, 'getUser').returns(true);
      let component = shallow(<UserInfo />);
      component.setProps({
        user: {
          name: 'Edwin'
        }
      });
      expect(component.find('Card').length).toEqual(1);
      expect(component.find('UpdaterModal').length).toEqual(1);
      let changeRole = function() {};
      component.unmount();
      UserActions.getUser.restore();
    });

    it('initializes with the correct state', function() {
      sinon.stub(UserActions, 'session').returns(true);
      sinon.stub(UserActions, 'getUser').returns({});
      let component = shallow( <UserInfo/ > );
      expect(component.state().user).toEqual({});
      component.unmount();
      UserActions.session.restore();
      UserActions.getUser.restore();
    });
  });

  describe('Component Methods Tests', function() {
    it('Calls componentDidMount', function() {
      sinon.spy(UserInfo.prototype, 'componentDidMount');
      sinon.stub(UserActions, 'getUser').returns({});
      let component = mount(<UserInfo />);
      expect(UserInfo.prototype.componentDidMount.called).toBe(true);
      UserInfo.prototype.componentDidMount.restore();
      component.unmount();
      UserActions.getUser.restore();
    });

    it('Calls componentWillUnmount', function() {
      sinon.spy(UserInfo.prototype, 'componentWillUnmount');
      sinon.stub(UserActions, 'session').returns(true);
      sinon.spy(UserStore, 'removeChangeListener');
      let component = mount( < UserInfo / > );
      component.unmount();
      expect(UserInfo.prototype.componentWillUnmount.called).toBe(true);
      expect(UserStore.removeChangeListener.called).toBe(true);
      UserInfo.prototype.componentWillUnmount.restore();
      UserStore.removeChangeListener.restore();
      UserActions.session.restore();
    });
  });

  describe('UserInfo class Methods', function() {
    var component;
    beforeEach(function() {
      sinon.stub(UserActions, 'session').returns(true);
      component = mount(<UserInfo />);
    });

    afterEach(function() {
      component.unmount();
      UserActions.session.restore();
    });

    it('getSession handling', function() {
      let instance = component.instance();
      let data = {
        user: {
          username: 'edwin'
        },
        loggedIn: true
      };
      UserStore.setSession(data);
      sinon.spy(instance, 'getSession');
      sinon.spy(UserStore, 'getSession');
      instance.getSession();
      expect(instance.getSession.called).toBe(true);
      expect(UserStore.getSession.called).toBe(true);
      expect(component.state()).toEqual(data);
      instance.getSession.restore();
      UserStore.getSession.restore();
    });
  });

});
