import React from 'react';
import {browserHistory} from 'react-router';
import Modal from 'react-modal';
import expect from 'expect';
import sinon from 'sinon';
import {mount,shallow} from 'enzyme';
import * as UserActions from '../../../actions/UserActions';
import UserStore from '../../../stores/UserStore';
import SignIn from '../SignIn.jsx';

describe ('SignIn Form Tests', function() {
  describe('Rendering tests', function() {
    it('renders the component correctly', function() {
      sinon.stub(UserActions, 'session').returns(true);
      let component = shallow(<SignIn />);
      expect(component.hasClass('row')).toBe(true);
      expect(component.find('.input-field').length).toBe(2);
      component.unmount();
      UserActions.session.restore();
    });

    it('initializes its state correctly', function() {
      let component = shallow(<SignIn />);
      expect(component.state().user.username).toEqual('');
      expect(component.state().user.password).toEqual('');
      component.unmount();
    });
  });

  describe('Lifecycle Methods tests', function() {
    it('Calls componentWillMount', function() {
      sinon.spy(SignIn.prototype, 'componentWillMount');
      sinon.spy(UserStore, 'addChangeListener');
      let component = mount(<SignIn />);
      expect(SignIn.prototype.componentWillMount.called).toBe(true);
      expect(UserStore.addChangeListener.called).toBe(true);
      SignIn.prototype.componentWillMount.restore();
      UserStore.addChangeListener.restore();
      component.unmount();
    });

    it('Calls componentWillUnmount', function() {
      sinon.stub(UserActions, 'session').returns(true);
      sinon.spy(SignIn.prototype, 'componentWillUnmount');
      sinon.spy(UserStore, 'removeChangeListener');
      let component = mount(<SignIn />);
      component.unmount();
      expect(SignIn.prototype.componentWillUnmount.called).toBe(true);
      expect(UserStore.removeChangeListener.called).toBe(true);
      SignIn.prototype.componentWillUnmount.restore();
      UserStore.removeChangeListener.restore();
      UserActions.session.restore()
    });
  });

  describe('Class Methods tests', function() {
    window.Materialize = {};
    var component;
    beforeEach(function() {
      window.Materialize.toast = sinon.spy();
      component = mount(<SignIn />);
    });

    afterEach(function() {
      component.unmount();
    });

    it('handleSignIn correct password', function() {
      let signInComponent = shallow(<SignIn />);
      sinon.stub(UserActions, 'session').returns(true);
      let instance = signInComponent.instance();
      let data = {
        user: {
          _id: 'er3wrfaasr3wrsfaf'
        },
        token: 'wewrwe.werwer.werwer',
        message: 'signed '
      };
      UserStore.setSignInResult(data);
      sinon.spy(instance, 'handleSignIn');
      sinon.spy(UserStore, 'getSignInResult');
      sinon.spy(localStorage, 'setItem');
      sinon.spy(browserHistory, 'push');
      instance.handleSignIn();
      expect(UserStore.getSignInResult.called).toBe(true);
      expect(window.Materialize.toast.withArgs(data.message).called).toBe(true);
      expect(browserHistory.push.withArgs('/dashboard').called).toBe(true);
      expect(localStorage.setItem.withArgs('token').called).toBe(true);
      instance.handleSignIn.restore();
      UserStore.getSignInResult.restore();
      browserHistory.push.restore();
      UserActions.session.restore();
      localStorage.setItem.restore();
    });

    it('handleSignIn invalid password/username', function() {
      let signInComponent = shallow(<SignIn />);
      sinon.stub(UserActions, 'session').returns(true);
      let instance = signInComponent.instance();
      let data = {
        error: {
          message: 'invalid credentials'
        }
      };
      UserStore.setSignInResult(data);
      sinon.spy(instance, 'handleSignIn');
      sinon.spy(UserStore, 'getSignInResult');
      sinon.spy(localStorage, 'setItem');
      sinon.spy(browserHistory, 'push');
      instance.handleSignIn();
      expect(UserStore.getSignInResult.called).toBe(true);
      expect(window.Materialize.toast.withArgs(data.error.message).called).toBe(true);
      instance.handleSignIn.restore();
      UserStore.getSignInResult.restore();
      browserHistory.push.restore();
      UserActions.session.restore();
      localStorage.setItem.restore();
    });

    it('should call handleSignInAction with Sign In data', function() {
      sinon.stub(UserActions, 'signIn').returns(true);
      let instance = component.instance();
      component.setState({
        user: {
          username: 'edwin',
          password: 'password'
        }
      });
      // simulate the Sign In event
      let signInEvent = {
        preventDefault: function() {}
      };
      sinon.spy(instance, 'handleSignInAction');
      sinon.spy(signInEvent, 'preventDefault');
      component.find('form').simulate('submit', signInEvent);
      expect(signInEvent.preventDefault.called).toBe(true);
      expect(UserActions.signIn.withArgs(component.state().user).called).toBe(true);
      UserActions.signIn.restore();
    });

    it('should not call handleSignInAction without Sign In data', function() {
      sinon.stub(UserActions, 'signIn').returns(true);
      let instance = component.instance();
      instance.setState({
        user: {
          username: '',
          password: ''
        }
      });
      // simulate the Sign In event
      let signInEvent = {
        preventDefault: function() {}
      };
      component.find('form').simulate('submit', signInEvent);
      sinon.spy(instance, 'handleSignInAction');
      sinon.spy(signInEvent, 'preventDefault');
      expect(signInEvent.preventDefault.called).toBe(false);
      expect(instance.handleSignInAction.calledOnce).toBe(false);
      instance.handleSignInAction.restore();
      UserActions.signIn.restore();
    });

    it('should correctly update the state', function() {
      let fieldChangeEvent = {
        target: {
          name: 'username',
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
