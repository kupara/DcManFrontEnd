import React from 'react';
import {browserHistory} from 'react-router';
import Modal from 'react-modal';
import expect from 'expect';
import sinon from 'sinon';
import {mount,shallow} from 'enzyme';
import * as UserActions from '../../../actions/UserActions';
import UserStore from '../../../stores/UserStore';
import AuthModal from '../AuthModal.jsx';
import Auth from '../Auth.jsx';


describe('Auth Modal Tests', function() {
  describe('Auth Modal Rendering', function() {
    it('renders the component correctly if user is not logged in', function() {
      let component = mount(<AuthModal />);
      component.setState({
        closeModal: function() {}
      });
      expect(component.find('FlatButton').children().text()).toMatch(/Sign in/);
      component.unmount();
    });

    it('initializes its state correctly', function() {
      let component = shallow( < AuthModal / > );
      expect(component.state().modalIsOpen).toEqual(false);
      expect(component.state().loggedIn).toEqual(false);
      component.unmount();
    });

    it('renders the component correctly if user is logged in', function() {
      let component = shallow(<AuthModal />);
      component.setState({
        loggedIn: true
      });
      //shows two buttons
      expect(component.find('FlatButton').length).toEqual(2);
      component.unmount();
    });
  });

  describe('Auth Modal LifeCycle Methods', function() {
    it('Calls componentWillMount', function() {
      sinon.spy(AuthModal.prototype, 'componentWillMount');
      sinon.spy(UserActions, 'session');
      sinon.spy(UserStore, 'addChangeListener');
      let component = mount( < AuthModal / > );
      expect(AuthModal.prototype.componentWillMount.called).toBe(true);
      expect(UserActions.session.called).toBe(true);
      expect(UserStore.addChangeListener.called).toBe(true);
      AuthModal.prototype.componentWillMount.restore();
      UserActions.session.restore();
      UserStore.addChangeListener.restore();
      component.unmount();
    });

    it('Calls componentWillUnmount', function() {
      sinon.spy(AuthModal.prototype, 'componentWillUnmount');
      sinon.spy(UserStore, 'removeChangeListener');
      let component = mount( < AuthModal / > );
      component.unmount();
      expect(AuthModal.prototype.componentWillUnmount.called).toBe(true);
      expect(UserStore.removeChangeListener.called).toBe(true);
      AuthModal.prototype.componentWillUnmount.restore();
      UserStore.removeChangeListener.restore();
    });
  });

  describe('AuthModal class Methods', function() {
    window.Materialize = {};
    var component;
    beforeEach(function() {
      window.Materialize.toast = sinon.spy();
      component = mount(<AuthModal />);
    });

    afterEach(function() {
      component.unmount();
    });

    it('getSession handling no error', function() {
      let instance = component.instance();
      UserStore.setSession({
        user: {
          name: 'edwin'
        }
      });
      sinon.spy(instance, 'getSession');
      sinon.spy(UserStore, 'getSession');
      instance.getSession();
      expect(instance.getSession.called).toBe(true);
      expect(UserStore.getSession.called).toBe(true);
      expect(component.state().loggedIn).toBe(true);
      instance.getSession.restore();
      UserStore.getSession.restore();
    });

    it('getSession error handling', function() {
      let instance = component.instance();
      UserStore.setSession({
        error: {}
      });
      sinon.spy(instance, 'getSession');
      sinon.spy(UserStore, 'getSession');
      instance.getSession();
      expect(instance.getSession.called).toBe(true);
      expect(UserStore.getSession.called).toBe(true);
      expect(component.state().loggedIn).toBe(false);
      instance.getSession.restore();
      UserStore.getSession.restore();
    });

    it('handleSignOut', function() {
      let instance = component.instance();
      let data = {
        message:'signed out'
      }
      UserStore.setSignOutResult(data);
      sinon.spy(instance, 'handleSignOut');
      sinon.spy(UserStore, 'getSignOutResult');
      sinon.spy(localStorage, 'removeItem');
      sinon.spy(browserHistory, 'push');
      instance.handleSignOut();
      expect(instance.handleSignOut.called).toBe(true);
      expect(UserStore.getSignOutResult.called).toBe(true);
      expect(window.Materialize.toast.withArgs(data.message).called).toBe(true);
      expect(browserHistory.push.withArgs('/').called).toBe(true);
      expect(localStorage.removeItem.withArgs('token').called).toBe(true);
      expect(component.state().loggedIn).toBe(false);
      instance.handleSignOut.restore();
      UserStore.getSignOutResult.restore();
      browserHistory.push.restore();
    });

    describe('handleSignOutAction', function() {
      it('should call handleSignOutAction on clicking Signout', function() {
        sinon.stub(UserActions, 'signOut').returns(true);
        let instance = component.instance();
        instance.setState({
          loggedIn: true
        });
        // simulate the submit form event
        let signOutEvent = {
          preventDefault: function() {}
        };
        sinon.spy(instance, 'handleSignOutAction');
        sinon.spy(signOutEvent, 'preventDefault');
        instance.handleSignOutAction(signOutEvent);
        expect(signOutEvent.preventDefault.called).toBe(true);
        expect(instance.handleSignOutAction.calledOnce).toBe(true);
        expect(UserActions.signOut.called).toBe(true);
        instance.handleSignOutAction.restore();
        UserActions.signOut.restore();
      });
    });

    xit('redirects to the homepage on handleDash()', function() {
      sinon.spy(browserHistory, 'push');
      sinon.stub(UserActions, 'signOut').returns(true);
      let instance = component.instance();
      instance.setState({
        loggedIn: true
      });
      instance.handleDash();
      expect(browserHistory.push.withArgs('/dashboard').called).toBe(true);
      browserHistory.push.restore();
    });
  });
});
