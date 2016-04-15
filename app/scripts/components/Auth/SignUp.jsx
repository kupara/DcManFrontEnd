import React from 'react';
import {browserHistory} from 'react-router';
import * as UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

const style = {
  button: {
    margin: 12,
    color: '#0288D1'
  },
  form: {
    margin: '0 auto'
  }
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignUpAction = this.handleSignUpAction.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      user: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        role: ''
      }    }
  }

  componentWillMount() {
    UserStore.addChangeListener(this.handleSignUp, 'signUp');
  }


  handleSignUp() {
    let data = UserStore.getSignUpResult();
    if (data && data.error) {
      window.Materialize.toast(data.error.message, 2000, 'error-toast rounded');
    } else {
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('userId', data.user._id);
      window.Materialize.toast(data.message, 2000, 'success-toast rounded');
      browserHistory.push('/dashboard');
      this.props.closeModal();
    }
  }

  handleFieldChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    this.state.user[field] = value;
    this.setState({
      user: this.state.user
    });
  }

  handleChange(event, index, value) {
    this.state.user['role'] = value;
    this.setState({
      user: this.state.user
    });
  }

  handleSignUpAction(event) {
    event.preventDefault();
    UserActions.signUp(this.state.user);
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  };

  componentWillUnmount() {
    UserStore.removeChangeListener(this.handleSignUp, 'signUp');
  }

  render() {
    return (
      <div className="row">
        <div className="col s12" style={style.form}>
          <TextField
            name="firstname"
            floatingLabelText="First Name"
            fullWidth={true}
            onChange={this.handleFieldChange}
            />
          &nbsp; &nbsp;
          <TextField
            name="lastname"
            floatingLabelText="Last Name"
            fullWidth={true}
            onChange={this.handleFieldChange}
            /><br/>
          <TextField
            name="username"
            floatingLabelText="Username"
            fullWidth={true}
            onChange={this.handleFieldChange}
            /><br/>
          <TextField
            name="email"
            floatingLabelText="Email Address"
            fullWidth={true}
            onChange={this.handleFieldChange}
            /><br/>
          <TextField
            name="password"
            floatingLabelText="Password"
            fullWidth={true}
            type="password"
            onChange={this.handleFieldChange}
            /><br/>
          <br/>
          <span>Select Role:</span> &nbsp;
          <SelectField value={this.state.role} onChange={this.handleChange}>
            <MenuItem value={"admin"} primaryText="admin"/>
            <MenuItem value={"user"} primaryText="user"/>
            <MenuItem value={"viewer"} primaryText="viewer"/>
          </SelectField><br/><br/>
          <RaisedButton
            label="Sign Up"
            onTouchTap = {this.handleSignUpAction}
            labelStyle={style.button}
            />
        </div>
      </div>
    );
  }
}

export default SignUpForm;
