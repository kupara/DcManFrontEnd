import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import {mount,shallow} from 'enzyme';
import CreatorModal from '../CreatorModal.jsx';

describe('Doc Creation Modal Component Tests', function() {
  it('renders the component correctly', function() {
    let component = mount(<CreatorModal />);
    expect(component.find('FloatingActionButton').length).toBe(1);
    expect(component.find('Modal').length).toBe(1);
    expect(component.state().modalIsOpen).toBe(false);
    component.unmount();
  });
});
