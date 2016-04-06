import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import AuthModal from '../Auth/AuthModal.jsx';

class NavAppBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <AppBar
        title="DCMan"
        style={{backgroundColor: '#0288D1'}}
        iconElementRight={
            <AuthModal />
          }
      />);
    }
}

export default NavAppBar;
