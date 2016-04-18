import React from 'react';
import Modal from 'react-modal';
import expect from 'expect';
import sinon from 'sinon';
import {mount,shallow} from 'enzyme';
import * as DocActions from '../../../actions/DocumentActions';
import DocStore from '../../../stores/DocumentStore';
import Updater from '../Updater.jsx';

describe('Document Creation Component Tests', function() {
  describe('Component Rendering Tests', function() {
    var component;
    beforeEach(() => {
      let data = {
        title: 'Test',
        content: 'Doc to be updated',
        accessLevel: 'private'
      }
      component = shallow(<Updater doc={data} />);
    });

    it('renders the component correctly', function() {
      expect(component.hasClass('row')).toBe(true);
      expect(component.find('.input-field').length).toEqual(2);
      expect(component.find('textarea').length).toEqual(1);
      component.unmount();
    });

    it('initializes with the correct state', function() {
      expect(component.state().doc.accessLevel).toBe('private');
      expect(component.state().doc.content).toBe('Doc to be updated');
      expect(component.state().doc.title).toBe('Test');
      component.unmount();
    });
  });

  describe('Component LifeCycle Tests', function() {
    var component;
    beforeEach(() => {
      let data = {
        title: 'Test',
        content: 'Doc to be updated',
        accessLevel: 'private'
      };
      window.Materialize.toast = sinon.spy();
      component = mount(<Updater doc={data} />);
    });

    it('Calls componentWillMount', function() {
      sinon.spy(Updater.prototype, 'componentWillMount');
      let data = {
        title: 'Test',
        content: 'Doc to be updated',
        accessLevel: 'private'
      };
      sinon.spy(DocStore, 'addChangeListener');
      component = mount(<Updater doc={data} />);
      expect(Updater.prototype.componentWillMount.called).toBe(true);
      expect(DocStore.addChangeListener.called).toBe(true);
      Updater.prototype.componentWillMount.restore();
      DocStore.addChangeListener.restore();
      component.unmount();
    });

    it('Calls componentWillUnmount', function() {
      sinon.spy(Updater.prototype, 'componentWillUnmount');
      sinon.spy(DocStore, 'removeChangeListener');
      component.unmount();
      expect(Updater.prototype.componentWillUnmount.called).toBe(true);
      expect(DocStore.removeChangeListener.called).toBe(true);
      Updater.prototype.componentWillUnmount.restore();
      DocStore.removeChangeListener.restore();
    });
  });

  describe('Component Method Tests', function() {
    window.Materialize = {};
    var component;
    beforeEach(() => {
      let data = {
        title: 'Test',
        content: 'Doc to be updated',
        accessLevel: 'private'
      }
      window.Materialize.toast = sinon.spy();
      component = mount(<Updater doc={data} />);
    });

    afterEach(function() {
      component.unmount();
    });

    it('handleDocUpdate no error', function() {
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
      DocStore.setDocUpdateResult(data);
      sinon.spy(instance, 'handleDocUpdate');
      sinon.spy(DocStore, 'getDocUpdateResult');
      sinon.spy(localStorage, 'getItem');
      instance.handleDocUpdate();
      expect(DocStore.getDocUpdateResult.called).toBe(true);
      expect(window.Materialize.toast.withArgs(data.message).called).toBe(true);
      expect(localStorage.getItem.withArgs('token').called).toBe(true);
      instance.handleDocUpdate.restore();
      DocStore.getDocUpdateResult.restore();
      DocActions.getUserDocs.restore();
      localStorage.getItem.restore();
    });

    it('handleDocUpdate error handling', function() {
      sinon.stub(DocActions, 'getUserDocs').returns({});
      let instance = component.instance();
      let data = {
        error: {
          message: 'creation error'
        }
      };
      DocStore.setDocUpdateResult(data);
      sinon.spy(instance, 'handleDocUpdate');
      sinon.spy(DocStore, 'getDocUpdateResult');
      instance.handleDocUpdate();
      expect(DocStore.getDocUpdateResult.called).toBe(true);
      expect(window.Materialize.toast.withArgs(data.error.message).called).toBe(true);
      instance.handleDocUpdate.restore();
      DocStore.getDocUpdateResult.restore();
      DocActions.getUserDocs.restore();
    });

    it('should call handleSubmit with creation data', function() {
      sinon.stub(DocActions, 'updateDoc').returns({});
      let instance = component.instance();
      component.setState({
        doc: {
          title: 'Update Test',
          content: 'This is a test doc',
          accessLevel: 'public'
        }
      });
      // simulate the Sign In event
      let updateEvent = {
        preventDefault: function() {}
      };
      sinon.spy(instance, 'handleSubmit');
      sinon.spy(updateEvent, 'preventDefault');
      component.find('form').simulate('submit', updateEvent);
      expect(updateEvent.preventDefault.called).toBe(true);
      expect(DocActions.updateDoc.called).toBe(true);
      DocActions.updateDoc.restore();
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
