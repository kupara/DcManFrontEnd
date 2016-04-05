import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

const style = {
  margin: 12,
  color: '#0288D1'
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TextField
          floatingLabelText="First Name"
          />
        &nbsp; &nbsp;
        <TextField
          floatingLabelText="Last Name"
          /><br/>
        <TextField
          floatingLabelText="Username"
          /><br/>
        <TextField
          floatingLabelText="Email Address"
          /><br/>
        <TextField
          floatingLabelText="Password"
          type="password"
          /><br/>
        <RaisedButton
          label="Sign Up"
          onTouchTap = {this.props.signInAction}
          labelStyle={style}
          />
      </div>
    );
  }
}

export default SignUpForm;
