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
    it('Calls componentWillMount', function() {
      sinon.spy(UserStore, 'addChangeListener');
      sinon.spy(UserInfo.prototype, 'componentWillMount');
      let component = mount(<UserInfo />);
      expect(UserInfo.prototype.componentWillMount.called).toBe(true);
      expect(UserStore.addChangeListener.called).toBe(true);
      UserInfo.prototype.componentWillMount.restore();
      UserStore.addChangeListener.restore();
      component.unmount();
    });

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

    it('getUserInfo handling', function() {
      let instance = component.instance();
      let data = {
        user: {
          username: 'edwin'
        }
      };
      UserStore.setUser(data);
      sinon.spy(instance, 'getUserInfo');
      sinon.spy(UserStore, 'getUser');
      instance.getUserInfo();
      expect(instance.getUserInfo.called).toBe(true);
      expect(UserStore.getUser.called).toBe(true);
      expect(component.state().user).toBe(data);
      instance.getUserInfo.restore();
      UserStore.getUser.restore();
    });
  });

});
