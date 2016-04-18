import React from 'react';
import {browserHistory} from 'react-router';
import Modal from 'react-modal';
import expect from 'expect';
import sinon from 'sinon';
import {mount,shallow} from 'enzyme';
import * as UserActions from '../../../actions/UserActions';
import UserStore from '../../../stores/UserStore';
import Dashboard from '../Index.jsx';
import UserDocs from '../MyDocsList.jsx';
import AllDocs from '../AllDocsList.jsx';

describe('Dashboard Component Tests', function() {
  describe('Component Rendering Tests', function() {
    it('renders the component correctly', function() {
      sinon.stub(UserActions, 'session').returns(true);
      sinon.stub(UserActions, 'getUser').returns(true);
      let component = shallow(<Dashboard />);
      expect(component.hasClass('row dcman')).toBe(true);
      expect(component.find('Tab').length).toEqual(2);
      expect(component.find('UserDocs').length).toEqual(1);
      expect(component.find('AllDocs').length).toEqual(1);
      component.unmount();
      UserActions.session.restore();
      UserActions.getUser.restore();
    });

    it('renders the Children Components', function() {
      sinon.stub(UserActions, 'session').returns(true);
      sinon.stub(UserActions, 'getUser').returns(true);
      let component = shallow(<Dashboard />);
      expect(component.contains(<UserDocs />)).toEqual(true);
      expect(component.contains(<AllDocs />)).toEqual(true);
      component.unmount();
      UserActions.session.restore();
      UserActions.getUser.restore();
    })
  });

  describe('Component Methods', function() {
    it('Calls componentWillMount', function() {
      sinon.stub(UserActions, 'session').returns(true);
      sinon.stub(UserActions, 'getUser').returns(true);
      sinon.spy(Dashboard.prototype, 'componentWillMount');
      sinon.spy(UserStore, 'addChangeListener');
      let component = mount(<Dashboard />);
      expect(Dashboard.prototype.componentWillMount.called).toBe(true);
      expect(UserActions.session.called).toBe(true);
      expect(UserStore.addChangeListener.called).toBe(true);
      Dashboard.prototype.componentWillMount.restore();
      UserStore.addChangeListener.restore();
      component.unmount();
      UserActions.getUser.restore();
      UserActions.session.restore();
    });

    it('Calls componentWillUnmount', function() {
      sinon.stub(UserActions, 'session').returns(true);
      sinon.stub(UserActions, 'getUser').returns(true);
      sinon.spy(Dashboard.prototype, 'componentWillUnmount');
      sinon.spy(UserStore, 'removeChangeListener');
      let component = mount(<Dashboard />);
      component.unmount();
      expect(Dashboard.prototype.componentWillUnmount.called).toBe(true);
      expect(UserStore.removeChangeListener.called).toBe(true);
      Dashboard.prototype.componentWillUnmount.restore();
      UserStore.removeChangeListener.restore();
      UserActions.getUser.restore();
      UserActions.session.restore();
    });

    it('getSession error handling', function() {
      sinon.stub(UserActions, 'session').returns(true);
      sinon.stub(UserActions, 'getUser').returns(true);
      let component = mount(<Dashboard />);
      UserStore.setSession({error: true});
      sinon.spy(Dashboard.prototype, 'getSession');
      sinon.spy(UserStore, 'getSession');
      sinon.spy(browserHistory, 'push');
      Dashboard.prototype.getSession();
      expect(Dashboard.prototype.getSession.called).toBe(true);
      expect(UserStore.getSession.called).toBe(true);
      expect(browserHistory.push.withArgs('/').called).toBe(true);
      Dashboard.prototype.getSession.restore();
      UserActions.getUser.restore();
      UserStore.getSession.restore();
      browserHistory.push.restore();
      UserActions.session.restore();
    });
  });

});
