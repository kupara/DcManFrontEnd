import React from 'react';
import NavAppBar from './AppBar.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// injectTapEventPlugin();

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loggedIn: false
    }
  }

  render() {
    return (
      <div>
        <NavAppBar
          loggedIn={this.state.loggedIn}
          setUser={this.state.user}
          />
        <div className="dcman"></div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
