'use strict';

import React from 'react';
import {browserHistory} from 'react-router';
import {spy, stub} from 'sinon';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import Landing from '../index.jsx';

describe('Landing component', function() {
  it('renders the correct content', function() {
    const component = shallow(<Landing />);
    expect(component.text()).toMatch(/DCMan/);
    expect(component.text()).toMatch(/Document Management System/);
    expect(component.text()).toMatch(/Helps you create and manage documents online/);
  });

  it('renders the component correctly', function() {
    const component = shallow(<Landing />);
    expect(component.hasClass('section')).toEqual(true);
    expect(component.find('.section').length).toEqual(1);
    expect(component.find('.container').length).toEqual(1);
    expect(component.find('.header').length).toEqual(3);
  });
});
