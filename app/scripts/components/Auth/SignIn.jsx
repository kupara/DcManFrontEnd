import React from 'react';
import * as UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import {browserHistory} from 'react-router';

const style = {
  button: {
    margin: 12,
    color: '#0288D1'
  },
  form: {
    margin: '50px auto'
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

  componentWillMount() {
    UserStore.addChangeListener(this.handleSignIn, 'signIn');
  }

  componentDidMount() {
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
      if (this.props.closeModal !== undefined) {
        this.props.closeModal();
      }
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

  componentWillUnmount() {
    UserStore.removeChangeListener(this.handleSignIn, 'signIn');
  }

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSignInAction}>
          <div className="input-field col s12">
            <input className="validate" id="username" name="username" onChange={this.handleFieldChange} required type="text"/>
            <label htmlFor="username">Username</label>
          </div>
          <br/>
          <div className="input-field col s12">
            <input className="validate" id="password" name="password" onChange={this.handleFieldChange} required type="password"/>
            <label htmlFor="password">Password</label>
          </div>

          <br/>
          <div className="col s12">
            <div className="center">
              <button className="btn waves-effect waves-light blue" name="action" type="submit">
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignInForm;
