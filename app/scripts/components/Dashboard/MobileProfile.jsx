import React from 'react';
import * as UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import UpdaterModal from './UpdaterModal.jsx';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import Avatar from 'material-ui/lib/avatar';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loggedIn: false
    }
    this.getSession = this.getSession.bind(this);
  }

  componentDidMount() {
    UserStore.addChangeListener(this.getSession, 'session');
    UserActions.session();
  }

  getSession() {
    let data = UserStore.getSession();
    if (data && data.loggedIn) {
      this.setState({
        user: data.user,
        loggedIn: data.loggedIn
      });
    }
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.getSession, 'session');
  }

  render() {
    return (
      (this.state.loggedIn)
      ?
      <div className="mobile-profile row">
        <div className="col s12">
          <div>
            <Avatar src="images/profile.png" size={64}/>
          </div>
          <div className="row username">
            {"@"+this.state.user.username}
          </div>
          <div className="row role-text">
            {this.state.user.role}
          </div>
          <div className=" row email-text">
            {this.state.user.email}
          </div>
        </div>
      </div>
      :
      <div className="mobile-profile username">
        You are not logged in.
      </div>
    );
  }
}

export default UserInfo;
