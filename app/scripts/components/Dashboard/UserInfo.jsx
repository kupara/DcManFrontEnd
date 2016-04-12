import React from 'react';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import FlatButton from 'material-ui/lib/flat-button';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    UserActions.session();
    UserStore.addChangeListener(this.getUserInfo, 'session');
  }

  getUserInfo() {
    let data = UserStore.getSession();
    if (data && data.loggedIn) {
      this.setState({
        user: data.user
      });
    }
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.getUserInfo, 'session');
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
          <FlatButton label="Modify" />
        </CardActions>
      </Card>

    );
  }
}

export default UserInfo;
