import React from 'react';
import {browserHistory} from 'react-router';
import Modal from 'react-modal';
import expect from 'expect';
import sinon from 'sinon';
import {mount,shallow} from 'enzyme';
import * as UserActions from '../../../actions/UserActions';
import UserStore from '../../../stores/UserStore';
import UpdaterModal from '../UpdaterModal.jsx';

describe('User Update Modal Component Tests', function() {
  it('renders the component correctly if user is not logged in', function() {
    sinon.stub(UserActions, 'session').returns(true);
    let component = mount(<UpdaterModal />);
    component.setState({
      closeModal: function() {}
    });
    expect(component.find('FlatButton').children().text()).toMatch(/Change My Details/);
    component.unmount();
    UserActions.session.restore();
  });
});
