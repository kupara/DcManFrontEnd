import React from 'react';
import {browserHistory} from 'react-router';
import * as UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import UpdaterModal from './UpdaterModal.jsx';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

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
    UserActions.session();
    UserStore.addChangeListener(this.getSession, 'session');
  }

  getSession() {
    let data = UserStore.getSession();
    if (data && data.loggedIn) {
      this.setState({
        user: data.user,
        loggedIn: data.loggedIn
      });
    } else {
      browserHistory.push('/')
    }
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.getSession, 'session');
  }


  render() {
    return (
      <div className="row">
        <div className="col s12 m6 offset-m3">
          <Card>
            <CardMedia>
              <img src="images/profile.png" />
            </CardMedia>
            <CardTitle title={"@"+this.state.user.username} />
            <CardText>
              <div className="role-text">
                {this.state.user.role}
              </div>
              <div className="email-text">
                {this.state.user.email}
              </div>
            </CardText>
            <CardActions>
              <UpdaterModal changeRole={this.props.changeRole} user={this.state.user} />
            </CardActions>
          </Card>
      </div>
      </div>
    );
  }
}

export default UserInfo;
