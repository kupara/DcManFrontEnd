import React from 'react';
import {browserHistory} from 'react-router';
import Card from 'material-ui/lib/card/card';
import UserDocs from './MyDocsList.jsx';
import AllDocs from './AllDocsList.jsx';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import FlatButton from 'material-ui/lib/flat-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  tab: {
    backgroundColor: '#0288D1'
  }
};

let token = window.localStorage.getItem('token');

class Dash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  if (!token) {
      browserHistory.push('/');
    }
  }


  render() {
    return (
      <div className="row">
        <div className="col s3">
          <Card>
            <CardMedia>
              <img src="images/profile.png" />
            </CardMedia>
            <CardTitle title="Your Name" subtitle="@username" />
            <CardText>
              Here is where the user info will go.
            </CardText>
          </Card>
        </div>
        <div className="col s9">
          <Tabs tabItemContainerStyle={styles.tab}>
            <Tab label="My Docs" >
              <UserDocs />
            </Tab>
            <Tab label="All Docs" >
              <AllDocs />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Dash;
