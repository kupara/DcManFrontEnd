import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import {mount,shallow} from 'enzyme';
import DeleterModal from '../DeleteModal.jsx';

describe('User Update Modal Component Tests', function() {
  it('renders the component correctly if user is not logged in', function() {
    let component = mount(<DeleterModal />);
    expect(component.find('FlatButton').length).toBe(1);
    expect(component.find('FlatButton').text()).toMatch(/Delete/);
    expect(component.find('Modal').length).toBe(1);
    expect(component.state().modalIsOpen).toBe(false);
    component.unmount();
  });
});
