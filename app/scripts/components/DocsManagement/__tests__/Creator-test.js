import React from 'react';
import Modal from 'react-modal';
import expect from 'expect';
import sinon from 'sinon';
import {mount,shallow} from 'enzyme';
import * as DocActions from '../../../actions/DocumentActions';
import DocStore from '../../../stores/DocumentStore';
import Creator from '../Creator.jsx';

describe('Document Creation Component Tests', function() {
  describe('Component Rendering Tests', function() {
    var component;
    beforeEach(() => {
      component = shallow(<Creator />);
    });

    it('renders the component correctly', function() {
      expect(component.hasClass('row')).toBe(true);
      expect(component.find('.input-field').length).toEqual(2);
      expect(component.find('textarea').length).toEqual(1);
      component.unmount();
    });

    it('initializes with the correct state', function() {
      expect(component.state().doc.accessLevel).toBe('private');
      expect(component.state().doc.content).toBe('');
      expect(component.state().doc.title).toBe('');
      //from localStorage
      expect(component.state().doc.ownerId).toBe('er3wrfaasr3wrsfaf');
      component.unmount();
    });
  });

  describe('Component LifeCycle Tests', function() {
    var component;
    beforeEach(() => {
      component = mount(<Creator/>);
    });

    it('Calls componentWillMount', function() {
      sinon.spy(Creator.prototype, 'componentWillMount');
      sinon.spy(DocStore, 'addChangeListener');
      component = mount(<Creator />);
      expect(Creator.prototype.componentWillMount.called).toBe(true);
      expect(DocStore.addChangeListener.called).toBe(true);
      Creator.prototype.componentWillMount.restore();
      DocStore.addChangeListener.restore();
      component.unmount();
    });

    it('Calls componentWillUnmount', function() {
      sinon.spy(Creator.prototype, 'componentWillUnmount');
      sinon.spy(DocStore, 'removeChangeListener');
      component.unmount();
      expect(Creator.prototype.componentWillUnmount.called).toBe(true);
      expect(DocStore.removeChangeListener.called).toBe(true);
      Creator.prototype.componentWillUnmount.restore();
      DocStore.removeChangeListener.restore();
    });
  });

  describe('Component Method Tests', function() {
    window.Materialize = {};
    var component;
    beforeEach(function() {
      window.Materialize.toast = sinon.spy();
      component = mount(<Creator/>);
    });

    afterEach(function() {
      component.unmount();
    });

    it('handleDocCreation no error', function() {
      sinon.stub(DocActions, 'getUserDocs').returns({});
      let instance = component.instance();
      let data = {
        doc: {
          title: 'Test title',
          content: 'edwin',
          accessLevel: 'private'
        },
        message: 'creation success '
      };
      DocStore.setDocCreationResult(data);
      sinon.spy(instance, 'handleDocCreation');
      sinon.spy(DocStore, 'getDocCreationResult');
      sinon.spy(localStorage, 'getItem');
      instance.handleDocCreation();
      expect(DocStore.getDocCreationResult.called).toBe(true);
      expect(window.Materialize.toast.withArgs(data.message).called).toBe(true);
      expect(localStorage.getItem.withArgs('token').called).toBe(true);
      instance.handleDocCreation.restore();
      DocStore.getDocCreationResult.restore();
      DocActions.getUserDocs.restore();
      localStorage.getItem.restore();
    });

    it('handleDocCreation error handling', function() {
      sinon.stub(DocActions, 'getUserDocs').returns({});
      let instance = component.instance();
      let data = {
        error: {
          message: 'creation error'
        }
      };
      DocStore.setDocCreationResult(data);
      sinon.spy(instance, 'handleDocCreation');
      sinon.spy(DocStore, 'getDocCreationResult');
      instance.handleDocCreation();
      expect(DocStore.getDocCreationResult.called).toBe(true);
      expect(window.Materialize.toast.withArgs(data.error.message).called).toBe(true);
      instance.handleDocCreation.restore();
      DocStore.getDocCreationResult.restore();
      DocActions.getUserDocs.restore();
    });

    it('should call handleSubmit with creation data', function() {
      sinon.stub(DocActions, 'createDoc').returns({});
      let instance = component.instance();
      component.setState({
        doc: {
          title: 'Create Test',
          content: 'This is a test doc',
          accessLevel: 'public'
        }
      });
      // simulate the Sign In event
      let createEvent = {
        preventDefault: function() {}
      };
      sinon.spy(instance, 'handleSubmit');
      sinon.spy(createEvent, 'preventDefault');
      component.find('form').simulate('submit', createEvent);
      expect(createEvent.preventDefault.called).toBe(true);
      expect(DocActions.createDoc.called).toBe(true);
      DocActions.createDoc.restore();
    });

    it('should correctly update the state', function() {
      let fieldChangeEvent = {
        target: {
          name: 'title',
          value: 'Test Document'
        },
        preventDefault: function() {}
      };
      const instance = component.instance();
      sinon.spy(instance, 'handleFieldChange');
      instance.handleFieldChange(fieldChangeEvent);
      expect(component.state().doc[fieldChangeEvent.target.name]).toBe(fieldChangeEvent.target.value);
      instance.handleFieldChange.restore();
    });
  });

});
