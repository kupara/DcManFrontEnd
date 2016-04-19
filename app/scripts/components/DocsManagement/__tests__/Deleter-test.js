import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import {mount,shallow} from 'enzyme';
import * as DocActions from '../../../actions/DocumentActions';
import DocStore from '../../../stores/DocumentStore';
import Delete from '../Deleter.jsx';

describe('Document Deletion Component Tests', function() {
  describe('Component Rendering Tests', function() {
    var component;
    beforeEach(() => {
      component = shallow(<Delete />);
    });

    it('renders the component correctly', function() {
      expect(component.hasClass('row')).toBe(true);
      expect(component.find('.row')
      .text()).toMatch(/Are you sure you want to delete this document/);
      component.unmount();
    });
  });

  describe('Component LifeCycle Tests', function() {
    var component;
    beforeEach(() => {
      window.Materialize.toast = sinon.spy();
      component = mount(<Delete />);
    });

    it('Calls componentWillMount', function() {
      sinon.spy(Delete.prototype, 'componentWillMount');
      sinon.spy(DocStore, 'addChangeListener');
      component = mount(<Delete />);
      expect(Delete.prototype.componentWillMount.called).toBe(true);
      expect(DocStore.addChangeListener.called).toBe(true);
      Delete.prototype.componentWillMount.restore();
      DocStore.addChangeListener.restore();
      component.unmount();
    });

    it('Calls componentWillUnmount', function() {
      sinon.spy(Delete.prototype, 'componentWillUnmount');
      sinon.spy(DocStore, 'removeChangeListener');
      component.unmount();
      expect(Delete.prototype.componentWillUnmount.called).toBe(true);
      expect(DocStore.removeChangeListener.called).toBe(true);
      Delete.prototype.componentWillUnmount.restore();
      DocStore.removeChangeListener.restore();
    });
  });

  describe('Component Method Tests', function() {
    window.Materialize = {};
    var component;
    beforeEach(() => {
      window.Materialize.toast = sinon.spy();
      component = mount(<Delete />);
    });

    afterEach(function() {
      component.unmount();
    });

    it('handleDocDelete no error', function() {
      sinon.stub(DocActions, 'getUserDocs').returns({});
      let instance = component.instance();
      let data = {
        message: 'Deletion success '
      };
      DocStore.setDocDeleteResult(data);
      sinon.spy(instance, 'handleDocDelete');
      sinon.spy(DocStore, 'getDocDeleteResult');
      instance.handleDocDelete();
      expect(DocStore.getDocDeleteResult.called).toBe(true);
      expect(window.Materialize.toast.withArgs(data.message).called).toBe(true);
      instance.handleDocDelete.restore();
      DocStore.getDocDeleteResult.restore();
      DocActions.getUserDocs.restore();
    });

    it('handleDocDelete error handling', function() {
      sinon.stub(DocActions, 'getUserDocs').returns({});
      let instance = component.instance();
      let data = {
        error: {
          message: 'Deletion error'
        }
      };
      DocStore.setDocDeleteResult(data);
      sinon.spy(instance, 'handleDocDelete');
      sinon.spy(DocStore, 'getDocDeleteResult');
      instance.handleDocDelete();
      expect(DocStore.getDocDeleteResult.called).toBe(true);
      expect(window.Materialize.toast.withArgs(data.error.message).called).toBe(true);
      instance.handleDocDelete.restore();
      DocStore.getDocDeleteResult.restore();
      DocActions.getUserDocs.restore();
    });

    it('should call handleDelete', function() {
      sinon.stub(DocActions, 'deleteDoc').returns({});
      let component = mount(<Delete doc={{id:'1'}} />);
      let instance = component.instance();
      // simulate the Delete event
      let deleteEvent = {
        preventDefault: function() {}
      };
      sinon.spy(instance, 'handleDelete');
      sinon.spy(deleteEvent, 'preventDefault');
      component.find('form').simulate('submit', deleteEvent);
      expect(deleteEvent.preventDefault.called).toBe(true);
      expect(DocActions.deleteDoc.called).toBe(true);
      DocActions.deleteDoc.restore();
    });
  });

});
