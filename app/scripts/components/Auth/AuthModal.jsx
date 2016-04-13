import React from 'react';
import Modal from 'react-modal';
import {browserHistory} from 'react-router';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import FlatButton from 'material-ui/lib/flat-button';
import Auth from './Auth.jsx';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
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
    this.state = {
      modalIsOpen: false,
      loggedIn: false
    };
  }

  componentDidMount() {
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
  console.log(data);
  if (data && !data.err) {
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
          <FlatButton
            label="Sign out"
            onTouchTap = {this.handleSignOutAction}
            labelStyle={{color: '#0082ff'}} />
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
