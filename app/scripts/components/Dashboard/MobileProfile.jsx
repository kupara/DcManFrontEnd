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

class MobileProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn
    }
    this.getSession = this.getSession.bind(this);
  }

  componentDidMount() {
    UserActions.session();
    UserStore.addChangeListener(this.getSession, 'session');
  }

  getSession() {
    let data = UserStore.getSession();
    if (data && data.error) {
      this.setState({
        loggedIn: false
      });
    } else {
      this.setState({
        loggedIn: true
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
          <div className="username">
            {"@"+this.props.user.username}
          </div>
          <div className="email-text">
            {this.props.user.email}
          </div>
          <div className="role-text">
            {this.props.user.role}
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

export default MobileProfile;
