import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

const style = {
  margin: 50,
  color: '#0288D1'
};

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TextField
          floatingLabelText="Username"
          /><br/>
        <TextField
          floatingLabelText="Password"
          type="password"
          /><br/>
        <br/>
        <RaisedButton
          label="Sign in"
          onTouchTap = {this.props.signInAction}
          labelStyle={style}
          />

      </div>
    );
  }
}

export default SignInForm;
