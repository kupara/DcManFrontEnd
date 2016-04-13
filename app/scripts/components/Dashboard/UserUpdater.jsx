import React from 'react';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import {history} from 'react-router';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';

const styles = {
  button: {
    margin: 12,
    color: '#0288D1'
  },
  form: {
    margin: '0 auto'
  }
};

class UserUpdater extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      user: {
        password: this.props.user.password,
        email: this.props.user.email,
        role: this.props.user.role
      }
    }
  }

  componentDidMount() {
    UserStore.on('userUpdate', this.handleUserUpdate);
  }


  handleUserUpdate() {
    let data = UserStore.getUpdateResult();
    if (data && data.err) {
      window.Materialize.toast(data.err, 2000, 'error-toast rounded');

    } else {
      window.Materialize.toast(data.message, 2000, 'success-toast rounded');
      let token = window.localStorage.getItem('token');
      let userId = window.localStorage.getItem('userId');
      UserActions.getUser(userId, token);
      this.props.closeModal();
    }
  }

  handleFieldChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    this.state.user[field] = value;
    this.setState({user: this.state.user});
  }

  handleSubmit(event) {
    event.preventDefault();
    let token = window.localStorage.getItem('token');
    UserActions.updateUser(this.props.user._id, this.state.user, token);
  }

  handleChange(event, index, value) {
    this.state.user['role'] = value;
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.closeModal();
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.handleUserUpdate, 'userUpdate');
  }

  render() {
    return (
      <div className="row">
        <div className="col s12" style={styles.form}>
          <TextField
            name="email"
            floatingLabelText="Email"
            defaultValue={this.state.user.email}
            fullWidth={true}
            type="text"
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
          <span>Change Role:</span> &nbsp;
          <SelectField value={this.state.role} onChange={this.handleChange}>
            <MenuItem value={"admin"} primaryText="admin"/>
            <MenuItem value={"user"} primaryText="user"/>
            <MenuItem value={"viewer"} primaryText="viewer"/>
          </SelectField><br/><br/>
          <RaisedButton
            label="Save Changes"
            onTouchTap = {this.handleSubmit}
            labelStyle={styles.button}
            />  &nbsp; &nbsp;
          <RaisedButton
           label="Cancel"
           onTouchTap={this.handleCancel}
          />
        </div>
      </div>
    );
  }
}

export default UserUpdater;
