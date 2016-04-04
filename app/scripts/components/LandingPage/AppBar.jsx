import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';

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
          <div>
            {
              this.props.loggedIn ?
                <FlatButton label="Logout" labelStyle={{color: '#FFF'}}/>
                :  <FlatButton label="Sign in" labelStyle={{color: '#FFF'}}/>

            }
            <FlatButton label="Sign up" />
          </div>
          }
      />);
    }
}

export default NavAppBar;
