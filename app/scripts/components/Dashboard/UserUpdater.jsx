import React from 'react';
import * as UserActions from '../../actions/UserActions';
import * as DocActions from '../../actions/DocumentActions';
import UserStore from '../../stores/UserStore';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

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
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRoleSelect = this.handleRoleSelect.bind(this);

    this.state = {
      user: {
        password: this.props.user.password,
        email: this.props.user.email,
        role: this.props.user.role
      }
    }
  }

  componentWillMount() {
    UserStore.addChangeListener(this.handleUserUpdate, 'userUpdate');
  }

  handleUserUpdate() {
    let data = UserStore.getUpdateResult();
    if (data && data.err) {
      window.Materialize.toast(data.err, 2000, 'error-toast rounded');
    } else {
      window.Materialize.toast(data.message, 2000, 'success-toast rounded');
      window.localStorage.setItem('token', data.token);
      let userId = window.localStorage.getItem('userId');
      UserActions.getUser(userId, data.token);
      DocActions.getAllDocs(data.token);
      if (this.props.closeModal !== undefined) {
        this.props.closeModal();
      }
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
    this.props.changeRole(this.state.user.role);
  }

  handleCancel(event) {
    event.preventDefault();
    if (this.props.closeModal !== undefined) {
      this.props.closeModal();
    }
  }

  handleRoleSelect(event, index, value) {
    this.state.user.role = value;
    this.setState({
      user: this.state.user
    });
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.handleUserUpdate, 'userUpdate');
  }

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="input-field col s12">
            <input className="validate"
                id="email"
                name="email"
                value={this.state.user.email}
                onChange={this.handleFieldChange}
                type="text"
            />
          <label className="active" htmlFor="email">Email Address</label>
          </div>
          <div className="input-field col s12">
            <input className="validate"
                id="password"
                name="password"
                onChange={this.handleFieldChange}
                type="password"
            />
          <label className="active" htmlFor="password">Password</label>
          </div>
          <div className="input-field col s12">
            <span>Select Role: </span> <br/>
            <SelectField
             value={this.state.user.role}
             onChange={this.handleRoleSelect}
             style={styles.text}>
               <MenuItem value={"admin"} primaryText="Admin"/>
               <MenuItem value={"user"} primaryText="User"/>
               <MenuItem value={"viewer"} primaryText="Viewer"/>
             </SelectField><br/><br/>
          </div>
          <div className="col s6">
            <div className="container center">
              <button className="btn waves-effect header-btn blue"
                  name="action"
                  type="submit"
              > Save Changes
              </button>
            </div>
          </div>
          <div className="col s6">
            <div className="container center">
              <button className="btn waves-effect header-btn blue"
                  name="action"
                  type="cancel"
                  onClick={this.handleCancel}
              > Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default UserUpdater;
