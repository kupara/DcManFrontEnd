import React from 'react';
import {browserHistory} from 'react-router';
import Select from 'react-select';
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
    margin: '50px auto'
  }
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignUpAction = this.handleSignUpAction.bind(this);
    this.handleRoleSelect = this.handleRoleSelect.bind(this);
    this.state = {
      user: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        role: ''
      },
      roles: [
        { value: 'owner', label: 'Owner' },
        { value: 'admin', label: 'Admin' },
        { value: 'user',  label: 'User' }
      ]
    }
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
    this.setState({user: this.state.user});
  }

  handleRoleSelect(role) {
    this.state.user['role'] = role.value;
    this.setState({user: this.state.user});
  }

  handleSignUpAction(event) {
    event.preventDefault();
    console.log(this.state.user);
    UserActions.signUp(this.state.user);
  }

  handleRequestClose() {
    this.setState({open: false});
  };

  componentWillUnmount() {
    UserStore.removeChangeListener(this.handleSignUp, 'signUp');
  }

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSignUpAction}>
          <div className="input-field col m6 s12">
            <input className="validate" id="firstname" name="firstname" onChange={this.handleFieldChange} required type="text"/>
            <label htmlFor="firstname">First Name</label>
          </div>
          <div className="input-field col m6 s12">
            <input className="validate" id="lastname" name="lastname" onChange={this.handleFieldChange} required type="text"/>
            <label htmlFor="lastname">Last Name</label>
          </div>
          <div className="input-field col m6 s12">
            <input className="validate" id="username" name="username" onChange={this.handleFieldChange} required type="text"/>
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-field col m6 s12">
            <input className="validate" id="email" name="email" onChange={this.handleFieldChange} required type="email"/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col m6 s12">
            <input className="validate" id="password" name="password" onChange={this.handleFieldChange} required type="password"/>
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-field col m6 s12">
            <Select
               name="role"
               onChange={this.handleRoleSelect}
               options={this.state.roles}
               placeholder="Select Role"
               value={this.state.role}
             />
          </div>
          <br/>
          <div className="col s12">
            <div className="center">
              <button className="btn waves-effect waves-light blue" name="action" type="submit">
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
