import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);
import { shallow, mount, render } from 'enzyme';
import Main from '../Main.jsx';
import AppBar from '../AppBar.jsx';

describe('Main component Tests', function() {
  it('renders the children components', function() {
    // It renders the provided child components
    const component = shallow(<Main children={<div>'Example of a child component.'</div>}/>);
    expect(component.contains(<div>'Example of a child component.'</div>)).toEqual(true);
    component.unmount();
  });

  it('renders the NavBar component', function() {
    // It renders the NavBar component and the provided child components
    const component = mount(<Main children={<div>'Some other child component.'</div>}/>);
    expect(component.find('AppBar').length).toEqual(2);
    expect(component.contains(<div>'Some other child component.'</div>)).toEqual(true);
    component.unmount();
  });

});
