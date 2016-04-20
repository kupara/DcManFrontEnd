import React from 'react';
import {browserHistory} from 'react-router';
import Modal from 'react-modal';
import expect from 'expect';
import sinon from 'sinon';
import {mount,shallow} from 'enzyme';
import * as DocActions from '../../../actions/DocumentActions';
import DocStore from '../../../stores/DocumentStore';
import AllDocsList from '../AllDocsList.jsx';

describe('AllDocs Listing Component Tests', function() {
  describe('AllDocs Component  Rendering Tests', function() {
    it('renders the component correctly if no docs exist', function() {
      let component = mount(<AllDocsList />);
      component.setState({
        docs: []
      });
      expect(component.find('Card').length).toBe(0);
      component.unmount();
    });

    it('renders the component correctly if docs exist', function() {
      let component = mount(<AllDocsList />);
      let docTest = [
        {
          _id: 'dsdsds',
          dataCreated: Date.now(),
          content: 'Content',
          title: 'Test Document',
          ownerId: { username: 'owner'}
        },
        {
          _id: 'dsdsdds',
          dataCreated: Date.now(),
          content: 'Content2',
          title: 'Test Document 2',
          ownerId: { username: 'owner'}
        }
      ];
      component.setState({
        docs: docTest
      });
      // shows 2 docs
      expect(component.find('Card').length).toBe(2);
      expect(component.find('AllDocs').childAt(0).text()).toMatch(/Test Document/);
      expect(component.find('AllDocs').childAt(1).text()).toMatch(/Test Document 2/);
      component.unmount();
    });

    it('initializes with the correct state', function() {
      sinon.stub(DocActions, 'getAllDocs').returns({});
      let component = shallow(<AllDocsList />);
      expect(component.state().docs).toEqual([]);
      component.unmount();
      DocActions.getAllDocs.restore();
    });
  });

  describe('AllDocs Component Method Tests', function() {
    it('Calls componentWillMount', function() {
      sinon.spy(AllDocsList.prototype, 'componentWillMount');
      sinon.spy(DocStore, 'addChangeListener');
      let component = mount(<AllDocsList />);
      expect(AllDocsList.prototype.componentWillMount.called).toBe(true);
      expect(DocStore.addChangeListener.called).toBe(true);
      AllDocsList.prototype.componentWillMount.restore();
      DocStore.addChangeListener.restore();
      component.unmount();
    });

    it('Calls componentDidMount', function() {
      sinon.stub(DocActions, 'getAllDocs').returns(true);
      sinon.spy(AllDocsList.prototype, 'componentDidMount');
      let component = mount(<AllDocsList />);
      expect(AllDocsList.prototype.componentDidMount.called).toBe(true);
      expect(DocActions.getAllDocs.called).toBe(true);
      AllDocsList.prototype.componentDidMount.restore();
      component.unmount();
      DocActions.getAllDocs.restore();
    });

    it('Calls componentWillUnmount', function() {
      sinon.spy(AllDocsList.prototype, 'componentWillUnmount');
      sinon.spy(DocStore, 'removeChangeListener');
      let component = mount(<AllDocsList />);
      component.unmount();
      expect(AllDocsList.prototype.componentWillUnmount.called).toBe(true);
      expect(DocStore.removeChangeListener.called).toBe(true);
      AllDocsList.prototype.componentWillUnmount.restore();
      DocStore.removeChangeListener.restore();
    });

    it('getAllDocs handling', function() {
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
      sinon.stub(DocActions, 'getAllDocs').returns(docTest);
      let component = mount(<AllDocsList />);
      sinon.spy(AllDocsList.prototype, 'getAllDocs');
      sinon.spy(DocStore, 'getAllDocs');
      AllDocsList.prototype.getAllDocs();
      expect(AllDocsList.prototype.getAllDocs.called).toBe(true);
      expect(DocStore.getAllDocs.called).toBe(true);
      component.unmount();
      AllDocsList.prototype.getAllDocs.restore();
      DocStore.getAllDocs.restore();
    });
  });

});
