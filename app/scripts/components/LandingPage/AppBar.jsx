import React from 'react';
import {browserHistory} from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import * as UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import AuthModal from '../Auth/AuthModal.jsx';
import MobileProfile from '../Dashboard/MobileProfile.jsx';
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';

const styles = {
  title: {
    cursor: 'pointer'
  }
};


export default class NavAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleTap = this.handleTap.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
     open: false,
     loggedIn: false,
     user: {}
    };
    this.getSession = this.getSession.bind(this);
  }

  componentDidMount() {
    UserActions.session();
    UserStore.addChangeListener(this.getSession, 'session');
  }

  getSession() {
    let data = UserStore.getSession();
    if (data && data.loggedIn) {
      this.setState({
        user: data.user,
        loggedIn: true
      });
    } else {
      this.setState({
        loggedIn: false
      });
    }
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.getSession, 'session');
  }

  handleToggle(){
    this.setState({
      open: !this.state.open
    });
  }

  handleClose() {
    this.setState({open: false});
    browserHistory.push('/profile');
  }

  handleTap() {
    browserHistory.push('/');
  }

  render() {
    return(
      <div>
        <AppBar
          title={<span style={styles.title}>DCMan</span>}
          onTitleTouchTap = {this.handleTap}
          titleStyle={{color: '#fff'}}
          className="nav-bar"
          style={{backgroundColor: '#0082ff'}}
          iconElementRight={<AuthModal />}
          iconElementLeft={
            <IconButton
              onTouchTap={this.handleToggle}
              className="icon-menu">
            <MenuIcon />
            </IconButton>}
          />
        <LeftNav
          open={this.state.open}
          docked={false}
          onRequestChange={open => this.setState({open})}>
          <div>
            <AppBar
              title="Profile"
              titleStyle={{color: '#fff'}}
              style={{backgroundColor: '#0082ff'}}
              onLeftIconButtonTouchTap={this.handleToggle}/>
            <MobileProfile user={this.state.user} loggedIn={this.state.loggedIn}/>
          </div>
          {
            (this.state.loggedIn)
          ?
          <MenuItem onTouchTap={this.handleClose}>My Profile</MenuItem>
          :
          <span></span>
        }
        </LeftNav>
      </div>
    );
  }
}
