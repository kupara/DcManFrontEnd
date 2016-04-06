import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SignUpForm from './SignUp.jsx';
import SignInForm from './SignIn.jsx';

// Needed for onTouchTap
injectTapEventPlugin();

const style = {
  tab: {
    backgroundColor: '#0288D1'
  },
  auth: {
    width: '100%',
    textAlign: 'center'
  }
};


class Auth extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange (value) {
    this.setState({
      value: value
    });
  }

  render() {
    return (
      <div className='container' style={style.auth}>
        <Tabs
          tabItemContainerStyle={style.tab}
          >
          <Tab label="Sign In">
            <SignInForm />
          </Tab>
          <Tab label="Sign Up" >
            <SignUpForm />
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default Auth;
