import React from 'react';
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
      user: {}
    }
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentWillMount() {
    UserStore.addChangeListener(this.getUserInfo, 'userInfo');
  }
  componentDidMount() {
    let token = window.localStorage.getItem('token');
    let userId = window.localStorage.getItem('userId');
    UserActions.getUser(userId, token);

  }

  getUserInfo() {
    let data = UserStore.getUser();
    if (data) {
      this.setState({
        user: data
      });
    }
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.getUserInfo, 'userInfo');
  }

  render() {
    return (
      <Card>
        <CardMedia>
          <img src="images/profile.png" />
        </CardMedia>
        <CardTitle title={"@"+this.state.user.username} subtitle={"Role: "+this.state.user.role} />
        <CardText>
          Email: {this.state.user.email}
        </CardText>
        <CardActions>
          <UpdaterModal changeRole={this.props.changeRole} user={this.state.user} />
        </CardActions>
      </Card>
    );
  }
}

export default UserInfo;
