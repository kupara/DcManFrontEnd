import React from 'react';
import {browserHistory} from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import AuthModal from '../Auth/AuthModal.jsx';

export default class NavAppBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleTap() {
    browserHistory.push('/');
  }
  render() {
    return(
      <AppBar
        title="DCMan"
        onTitleTouchTap = {this.handleTap.bind(this)}
        titleStyle={{color: "#0082ff"}}
        style={{backgroundColor: "#f5f5f5"}}
        iconElementRight={<AuthModal />}
      />);
    }
}
