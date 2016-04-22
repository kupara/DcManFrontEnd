'use strict';

import React from 'react';
import {browserHistory} from 'react-router';
import {spy, stub} from 'sinon';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import Landing from '../index.jsx';

describe('Landing Page Tests', function() {
  it('renders the correct content', function() {
    const component = shallow(<Landing />);
    expect(component.text()).toMatch(/DCMan/);
    expect(component.text()).toMatch(/Make document management online a breezeWith DCMan/);
    expect(component.text()).toMatch(/You can choose access levels for each document you create/);
  });

  it('renders the component correctly', function() {
    const component = shallow(<Landing />);
    console.log(component.debug());
    expect(component.find('.container').length).toEqual(1);
    expect(component.find('.header').length).toEqual(2);
  });
});
