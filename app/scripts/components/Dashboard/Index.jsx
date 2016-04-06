import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
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

class Dash extends React.Component {
  constructor() {
    super();
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
              <Card style={{margin: 15}}>
                <CardHeader
                  title="Without Avatar"
                  subtitle="Subtitle"
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardText expandable={true}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                  Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                  Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
                <CardActions expandable={true}>
                  <FlatButton label="Action1"/>
                  <FlatButton label="Action2"/>
                </CardActions>
              </Card>
              <Card style={{margin: 15}}>
                <CardHeader
                  title="Without Avatar"
                  subtitle="Subtitle"
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardText expandable={true}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                  Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                  Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
                <CardActions expandable={true}>
                  <FlatButton label="Action1"/>
                  <FlatButton label="Action2"/>
                </CardActions>
              </Card>
            </Tab>
            <Tab label="All Docs" >
              <div>
                <h2 style={styles.headline}>Tab One</h2>
                <p>
                  This is an example tab.
                </p>
                <p>
                  You can put any sort of HTML or react component in here. It even keeps the component state!
                </p>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Dash;
