import React from 'react';
import {browserHistory} from 'react-router';
import Modal from 'react-modal';
import expect from 'expect';
import sinon from 'sinon';
import {mount,shallow} from 'enzyme';
import * as UserActions from '../../../actions/UserActions';
import UserStore from '../../../stores/UserStore';
import SignUp from '../SignUp.jsx';

describe ('SignUp Form Tests', function() {
  describe('Rendering tests', function() {
    it('renders the component correctly', function() {
      sinon.stub(UserActions, 'session').returns(true);
      let component = shallow(<SignUp />);
      expect(component.hasClass('row')).toBe(true);
      expect(component.find('.input-field').length).toBe(6);
      component.unmount();
      UserActions.session.restore();
    });

    it('initializes its state correctly', function() {
      let component = shallow(<SignUp />);
      expect(component.state().user.firstname).toEqual('');
      expect(component.state().user.lastname).toEqual('');
      expect(component.state().user.username).toEqual('');
      expect(component.state().user.email).toEqual('');
      expect(component.state().user.role).toEqual('');
      expect(component.state().user.password).toEqual('');
      component.unmount();
    });
  });

  describe('Lifecycle Methods tests', function() {
    it('Calls componentWillMount', function() {
      sinon.spy(SignUp.prototype, 'componentWillMount');
      sinon.spy(UserStore, 'addChangeListener');
      let component = mount(<SignUp />);
      expect(SignUp.prototype.componentWillMount.called).toBe(true);
      expect(UserStore.addChangeListener.called).toBe(true);
      SignUp.prototype.componentWillMount.restore();
      UserStore.addChangeListener.restore();
      component.unmount();
    });

    it('Calls componentWillUnmount', function() {
      sinon.stub(UserActions, 'session').returns(true);
      sinon.spy(SignUp.prototype, 'componentWillUnmount');
      sinon.spy(UserStore, 'removeChangeListener');
      let component = mount(<SignUp />);
      component.unmount();
      expect(SignUp.prototype.componentWillUnmount.called).toBe(true);
      expect(UserStore.removeChangeListener.called).toBe(true);
      SignUp.prototype.componentWillUnmount.restore();
      UserStore.removeChangeListener.restore();
      UserActions.session.restore()
    });
  });

  describe('Class Methods tests', function() {
    window.Materialize = {};
    var component;
    beforeEach(function() {
      window.Materialize.toast = sinon.spy();
      component = mount(<SignUp />);
    });

    afterEach(function() {
      component.unmount();
    });

    it('handleSignUp', function() {
      let signUpComponent = shallow(<SignUp />);
      sinon.stub(UserActions, 'session').returns(true);
      let instance = signUpComponent.instance();
      let data = {
        user: {
          _id: 'er3wrfaasr3wrsfaf'
        },
        token: 'wewrwe.werwer.werwer',
        message: 'signed up'
      };
      UserStore.setSignUpResult(data);
      sinon.spy(instance, 'handleSignUp');
      sinon.spy(UserStore, 'getSignUpResult');
      sinon.spy(localStorage, 'setItem');
      sinon.spy(browserHistory, 'push');
      instance.handleSignUp();
      expect(UserStore.getSignUpResult.called).toBe(true);
      expect(window.Materialize.toast.withArgs(data.message).called).toBe(true);
      expect(browserHistory.push.withArgs('/dashboard').called).toBe(true);
      expect(localStorage.setItem.withArgs('token').called).toBe(true);
      instance.handleSignUp.restore();
      UserStore.getSignUpResult.restore();
      browserHistory.push.restore();
      UserActions.session.restore();
      localStorage.setItem.restore();
    });

    it('should call handleSignUpAction with Sign In data', function() {
      sinon.stub(UserActions, 'signUp').returns(true);
      let instance = component.instance();
      instance.setState({
        user: {
          firstname: 'Edwin',
          lastname: 'Kups',
          username: 'edwin',
          password: 'password',
          role: 'admin',
          email: 'eddu@email.com'
        }
      });
      // simulate the Sign Up event
      let signUpEvent = {
        preventDefault: function() {}
      };
      sinon.spy(signUpEvent, 'preventDefault');
      component.find('form').simulate('submit', signUpEvent);
      expect(signUpEvent.preventDefault.called).toBe(true);
      expect(UserActions.signUp.withArgs(component.state().user).called).toBe(true);
      UserActions.signUp.restore();
    });

    it('should not call handleSignUpAction if Sign Up data is invalid', function() {
      sinon.stub(UserActions, 'signUp').returns(true);
      let instance = component.instance();
      instance.setState({
        user: {
          firstname: 'Edwin',
          lastname: 'Kups',
          username: 'edwin',
          password: 'password',
          role: 'admin',
          email: 'edduemail.com'
        }
      });
      // simulate the Sign Up event
      let signUpEvent = {
        preventDefault: function() {}
      };
      component.find('form').simulate('submit', signUpEvent);
      sinon.spy(instance, 'handleSignUpAction');
      sinon.spy(signUpEvent, 'preventDefault');
      expect(signUpEvent.preventDefault.called).toBe(false);
      expect(instance.handleSignUpAction.called).toBe(false);
      UserActions.signUp.restore();
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
