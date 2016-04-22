import React from 'react';
import {browserHistory} from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import AuthModal from '../Auth/AuthModal.jsx';
import MobileProfile from '../Dashboard/MobileProfile.jsx';
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';

export default class NavAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleTap = this.handleTap.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
     open: false
    };
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
          title="DCMan"
          onTitleTouchTap = {this.handleTap}
          titleStyle={{color: '#0082ff'}}
          style={{backgroundColor: 'rgba(232, 225, 225, 0.24)'}}
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
          docked={false}>
          <div>
            <AppBar
              title="Profile"
              titleStyle={{color: '#0082ff'}}
              style={{backgroundColor: 'rgba(232, 225, 225, 0.24)'}}
              onLeftIconButtonTouchTap={this.handleToggle}/>
            <MobileProfile />
          </div>
          <MenuItem onTouchTap={this.handleClose}>Go to My Profile</MenuItem>
        </LeftNav>
      </div>
    );
  }
}
