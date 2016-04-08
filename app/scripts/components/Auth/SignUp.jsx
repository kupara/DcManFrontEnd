import React from 'react';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
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

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleSignupAction = this.handleSignupAction.bind(this);

    this.state = {
      user: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
      },
      result: ''
    }
  }

  componentDidMount() {
    UserStore.addChangeListener(this.handleSignup);
    var token = localStorage.getItem('token');
    if (token) {
      //this.history.pushState(null, '/dashboard');
      console.log(token);
    }
  }


  handleSignup() {
    let data = UserStore.getSignupResult();
    console.log(data);
    if (data) {
      if (data.error) {
        console.log('error-toast');
      } else {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('userId', data.user._id);
        this.setState({result: 'signup successful'});
        // this.history.pushState(null, '/');
      }
    }
  }

  handleFieldChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    this.state.user[field] = value;
    this.setState({user: this.state.user});
  }

  handleSignupAction(event) {
    event.preventDefault();
    UserActions.signup(this.state.user);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.handleSignup);
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
          <RaisedButton
            label="Sign Up"
            onTouchTap = {this.handleSignupAction}
            labelStyle={style.button}
            />
        </div>
      </div>
    );
  }
}

export default SignUpForm;
