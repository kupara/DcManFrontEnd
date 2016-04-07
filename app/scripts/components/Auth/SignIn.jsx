import React from 'react';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import {history} from 'react-router';
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
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
    this.handleSigninAction = this.handleSigninAction.bind(this);

    this.state = {
      user: {
        username: '',
        password: ''
      },
      result: ''
    }
  }

  componentWillMount() {
    UserStore.addChangeListener(this.handleSignin);
    var token = localStorage.getItem('token');
    if (token) {
      //this.history.pushState(null, '/dashboard');
      console.log(token);
    }
  }


  handleSignin() {
    let data = UserStore.getLoginResult();
    console.log(data);
    if (data) {
      if (data.error) {
        console.log('error-toast');
      } else {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('userId', data.user._id);
        this.setState({result: 'successful'});
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

  handleSigninAction(event) {
    event.preventDefault();
    UserActions.login(this.state.user);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.handleSignin, 'login');
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
            onTouchTap={this.handleSigninAction}
            labelStyle={style.button}
            />
        </div>
      </div>
    );
  }
}

export default SignInForm;
