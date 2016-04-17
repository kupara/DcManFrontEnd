import React from 'react';
import {browserHistory} from 'react-router';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import * as UserActions from '../../../actions/UserActions';
import UserStore from '../../../stores/UserStore';
import Auth from '../Auth.jsx';
import SignIn from '../SignIn.jsx';
import SignUp from '../SignUp.jsx';

describe('Auth Page Tests', function() {
  describe('Auth Component Rendering', function() {
    it('renders the component correctly', function() {
      let component = shallow(<Auth />);
      expect(component.hasClass('container')).toEqual(true);
      expect(component.find('Tab').length).toEqual(2);
      expect(component.find('SignInForm').length).toEqual(1);
      expect(component.find('SignUpForm').length).toEqual(1);
      component.unmount();
    });

    it('renders the Children Components', function() {
      let component = shallow(<Auth />);
      component.setState({
        closeModal: function(){}
      });
      expect(component.contains(<SignIn closeModal={component.props().closeModal}/>)).toEqual(true);
      expect(component.contains(<SignUp closeModal={component.props().closeModal}/>)).toEqual(true);
      component.unmount();
    })
  });

  describe('Auth Page Methods', function() {
    it('Calls componentWillMount', function() {
      sinon.spy(Auth.prototype, 'componentWillMount');
      sinon.spy(UserActions, 'session');
      sinon.spy(UserStore, 'addChangeListener');
      let component = mount(<Auth />);
      expect(Auth.prototype.componentWillMount.called).toBe(true);
      expect(UserActions.session.called).toBe(true);
      expect(UserStore.addChangeListener.called).toBe(true);
      Auth.prototype.componentWillMount.restore();
      UserActions.session.restore();
      UserStore.addChangeListener.restore();
      component.unmount();
    });

    it('Calls componentWillUnmount', function() {
      sinon.spy(Auth.prototype, 'componentWillUnmount');
      sinon.spy(UserStore, 'removeChangeListener');
      let component = mount(<Auth />);
      component.unmount();
      expect(Auth.prototype.componentWillUnmount.called).toBe(true);
      expect(UserStore.removeChangeListener.called).toBe(true);
      Auth.prototype.componentWillUnmount.restore();
      UserStore.removeChangeListener.restore();
    });

    it('getSession handling no error', function() {
      let component = mount(<Auth />);
      UserStore.setSession({loggedIn:true});
      sinon.spy(Auth.prototype, 'getSession');
      sinon.spy(UserStore, 'getSession');
      sinon.spy(browserHistory, 'push');
      Auth.prototype.getSession();
      expect(Auth.prototype.getSession.called).toBe(true);
      expect(UserStore.getSession.called).toBe(true);
      expect(browserHistory.push.withArgs('/dashboard').called).toBe(true);
      component.unmount();
      Auth.prototype.getSession.restore();
      UserStore.getSession.restore();
      browserHistory.push.restore();
    });

    it('getSession error handling', function() {
      let component = mount(<Auth />);
      UserStore.setSession({error: true});
      sinon.spy(Auth.prototype, 'getSession');
      sinon.spy(UserStore, 'getSession');
      sinon.spy(browserHistory, 'push');
      Auth.prototype.getSession();
      expect(Auth.prototype.getSession.called).toBe(true);
      expect(UserStore.getSession.called).toBe(true);
      expect(browserHistory.push.withArgs('/').called).toBe(true);
      Auth.prototype.getSession.restore();
      UserStore.getSession.restore();
      browserHistory.push.restore();
    })
  })

})
