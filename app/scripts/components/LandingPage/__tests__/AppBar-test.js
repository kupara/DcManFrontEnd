'use strict';

import React from 'react';
import {browserHistory} from 'react-router';
import {spy, stub} from 'sinon';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import NavAppBar from '../AppBar.jsx';
import AuthModal from '../../Auth/AuthModal.jsx';
import AppBar from 'material-ui/lib/app-bar';
import UserActions from '../../../actions/UserActions';
import UserStore from '../../../stores/UserStore';

describe('<NavAppBar>', function() {
  let wrapper;
  beforeEach(() => wrapper = shallow(<NavAppBar />));

  it('renders the NavAppBar', () => {
    expect(wrapper).toExist();
  });

  it('renders NavAppBar with the correct content', function() {
    let component = mount(<NavAppBar />);
    expect(component.find('DCMan'))
    expect(component.find(AppBar).length).toEqual(1);
    expect(component.find(AuthModal).length).toEqual(1);
  });

});
