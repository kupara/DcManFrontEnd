import React from 'react';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import {browserHistory} from 'react-router';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

const style = {
  button: {
    margin: 12,
    color: '#0288D1'
  },
  form: {
    margin: '0 auto'
  }
};

class SignInForm extends React.Component {
  constructor(props, context) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignInAction = this.handleSignInAction.bind(this);
    this.state = {
      user: {
        username: '',
        password: ''
      }
    }
  }

  componentDidMount() {
    UserStore.addChangeListener(this.handleSignIn, 'signIn');
    let token = window.localStorage.getItem('token');
    if (token) {
      browserHistory.push('/dashboard');
    }
  }


  handleSignIn() {
    let data = UserStore.getSignInResult();
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

  handleSignInAction(event) {
    event.preventDefault();
    UserActions.signIn(this.state.user);
  }
  handleRequestClose() {
    this.setState({
      success: false,
      failure: false
    });
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.handleSignIn, 'signIn');
  }

  render() {
    return (
      <div className="row">
        <div className="col s12" style={style.form}>
          <TextField
            name="username"
            floatingLabelText="Username"
            fullWidth={true}
            onChange={this.handleFieldChange}
            /><br/>
          <TextField
            name="password"
            floatingLabelText="Password"
            type="password"
            fullWidth={true}
            onChange={this.handleFieldChange}
            /><br/>
          <br/>
          <RaisedButton
            label="Sign in"
            onTouchTap={this.handleSignInAction}
            labelStyle={style.button}
            />
        </div>
      </div>
    );
  }
}

export default SignInForm;
