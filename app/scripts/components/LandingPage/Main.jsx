import React from 'react';
import NavAppBar from './AppBar.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// injectTapEventPlugin();

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
  }

  render() {
    return (
      <div>
        <NavAppBar
          loggedIn={this.state.loggedIn}
          />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
