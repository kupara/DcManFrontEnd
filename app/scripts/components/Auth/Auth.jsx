import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SignUpForm from './SignUp.jsx';
import SignInForm from './SignIn.jsx';

// Needed for onTouchTap
injectTapEventPlugin();

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'signin'
    };

  }

  handleChange (value) {
    this.setState({
      value: value
    });
  };

  render() {
    return (
      <div className='container'>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          >
          <Tab label="Sign In" value='signin' >
            <SignInForm />
          </Tab>
          <Tab label="Sign Up" value='signup' >
            <SignUpForm />
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default Auth;
