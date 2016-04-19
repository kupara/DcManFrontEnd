import React from 'react';
import {browserHistory} from 'react-router';
import expect from 'expect';
import sinon from 'sinon';
import {mount,shallow} from 'enzyme';
import * as DocActions from '../../../actions/DocumentActions';
import DocStore from '../../../stores/DocumentStore';
import MyDocsList from '../MyDocsList.jsx';

describe('UserDocs Listing Component Tests', function() {
  describe('UserDocs Component  Rendering Tests', function() {
    it('renders the component correctly if no docs exist', function() {
      let component = mount(<MyDocsList />);
      component.setState({
        docs: []
      });
      expect(component.find('CreatorModal').length).toBe(1);
      expect(component.find('Card').length).toBe(0);
      component.unmount();
    });

    it('renders the component correctly if docs exist', function() {
      let component = mount(<MyDocsList />);
      let docTest = [
        {
          _id: 'dsdsds',
          dataCreated: Date.now(),
          content: 'Content',
          title: 'Test Document'
        },
        {
          _id: 'dsdsdds',
          dataCreated: Date.now(),
          content: 'Content2',
          title: 'Test Document 2'
        }
      ];
      component.setState({
        docs: docTest
      });
      // shows 2 docs
      expect(component.find('Card').length).toBe(2);
      expect(component.find('UserDocs').childAt(0).text()).toMatch(/Test Document/);
      expect(component.find('UserDocs').childAt(1).text()).toMatch(/Test Document 2/);
      expect(component.find('CreatorModal').length).toBe(1);
      component.unmount();
    });

    it('initializes with the correct state', function() {
      sinon.stub(DocActions, 'getUserDocs').returns({});
      let component = shallow(<MyDocsList />);
      expect(component.state().docs).toEqual([]);
      component.unmount();
      DocActions.getUserDocs.restore();
    });
  });

  describe('UserDocs Component Method Tests', function() {
    it('Calls componentWillMount', function() {
      sinon.spy(MyDocsList.prototype, 'componentWillMount');
      sinon.spy(DocStore, 'addChangeListener');
      let component = mount(<MyDocsList />);
      expect(MyDocsList.prototype.componentWillMount.called).toBe(true);
      expect(DocStore.addChangeListener.called).toBe(true);
      MyDocsList.prototype.componentWillMount.restore();
      DocStore.addChangeListener.restore();
      component.unmount();
    });

    it('Calls componentDidMount', function() {
      sinon.stub(DocActions, 'getUserDocs').returns(true);
      sinon.spy(MyDocsList.prototype, 'componentDidMount');
      let component = mount(<MyDocsList />);
      expect(MyDocsList.prototype.componentDidMount.called).toBe(true);
      expect(DocActions.getUserDocs.called).toBe(true);
      MyDocsList.prototype.componentDidMount.restore();
      component.unmount();
      DocActions.getUserDocs.restore();
    });

    it('Calls componentWillUnmount', function() {
      sinon.spy(MyDocsList.prototype, 'componentWillUnmount');
      sinon.spy(DocStore, 'removeChangeListener');
      let component = mount(<MyDocsList />);
      component.unmount();
      expect(MyDocsList.prototype.componentWillUnmount.called).toBe(true);
      expect(DocStore.removeChangeListener.called).toBe(true);
      MyDocsList.prototype.componentWillUnmount.restore();
      DocStore.removeChangeListener.restore();
    });

    it('getUserDocs handling', function() {
      let docTest = [
        {
          _id: 'dsdsds',
          dataCreated: Date.now(),
          content: 'Content',
          title: 'Test Document'
        },
        {
          _id: 'dsdsdds',
          dataCreated: Date.now(),
          content: 'Content2',
          title: 'Test Document 2'
        }
      ];
      sinon.stub(DocActions, 'getUserDocs').returns(docTest);
      let component = mount(<MyDocsList />);
      sinon.spy(MyDocsList.prototype, 'getUserDocs');
      sinon.spy(DocStore, 'getUserDocs');
      MyDocsList.prototype.getUserDocs();
      expect(MyDocsList.prototype.getUserDocs.called).toBe(true);
      expect(DocStore.getUserDocs.called).toBe(true);
      component.unmount();
      MyDocsList.prototype.getUserDocs.restore();
      DocActions.getUserDocs.restore();
      DocStore.getUserDocs.restore();
    });
  });

});
