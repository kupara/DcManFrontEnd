import React from 'react';
import Modal from 'react-modal';
import {browserHistory} from 'react-router';
import * as UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import FlatButton from 'material-ui/lib/flat-button';
import Auth from './Auth.jsx';

const customStyles = {
  content : {
    top: '400px',
    width: '33%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default class AuthModal extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.getSession = this.getSession.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleSignOutAction = this.handleSignOutAction.bind(this);
    this.handleDash = this.handleDash.bind(this);
    this.state = {
      modalIsOpen: false,
      loggedIn: false
    };
  }

  componentWillMount() {
    UserActions.session();
    UserStore.addChangeListener(this.getSession, 'session');
    UserStore.addChangeListener(this.handleSignOut, 'signOut');
  }

  getSession() {
    let data = UserStore.getSession();
    if (data && data.error) {
      this.setState({
        loggedIn:false
      });
    } else {
      this.setState({
        loggedIn:true
      });
    }
  }

handleSignOut() {
  let data = UserStore.getSignOutResult();
  if (data && !data.err) {
    this.setState({
      loggedIn: false
    });
    window.Materialize.toast(data.message, 4000, 'success-toast rounded');
    window.localStorage.removeItem('token');
    browserHistory.push('/');
  }
}

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  handleSignOutAction(event) {
    event.preventDefault();
    let token = window.localStorage.getItem('token');
    UserActions.signOut(token);
  }

  handleDash() {
    event.preventDefault();
    browserHistory.push('/dashboard');
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.getSession, 'session');
    UserStore.removeChangeListener(this.handleSignOut, 'signOut');
  }

  render() {
    let self = this;
    return (
      <div>
        {(this.state.loggedIn === true)
          ?
          <span>
            <FlatButton
              label="dashboard"
              onTouchTap = {this.handleDash}
              labelStyle={{color: '#0082ff'}} />
            <FlatButton
              label="Sign out"
              onTouchTap = {this.handleSignOutAction}
              labelStyle={{color: '#0082ff'}} />
          </span>
          :
          <FlatButton
            label="Sign in"
            onTouchTap = {this.openModal}
            labelStyle={{color: '#0082ff'}} />
        }

        <Modal
          isOpen={self.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <Auth closeModal={this.closeModal}/>
        </Modal>
      </div>
    );
  }
}
