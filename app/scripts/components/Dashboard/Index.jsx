import React from 'react';
import {browserHistory} from 'react-router';
import * as UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import UserDocs from './MyDocsList.jsx';
import UserInfo from './UserInfo.jsx';
import AllDocs from './AllDocsList.jsx';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

const styles = {
  tab: {
    backgroundColor: '#f5f5f5',
    color: "#0082ff"
  }
};

class Dash extends React.Component {
  constructor(props) {
    super(props);
    this.getSession = this.getSession.bind(this);
    this.handleRoleUpdate = this.handleRoleUpdate.bind(this);
    this.state = {
      role: 'viewer',
      hasRoleChanged: false
    }
  }

  componentWillMount() {
    UserActions.session();
    UserStore.addChangeListener(this.getSession, 'session');
  }

  getSession() {
    let data = UserStore.getSession();
    if (data && !data.loggedIn) {
      browserHistory.push('/');
    } else {
      this.setState({
        role: data.user.role
      });
    }
  }

  handleRoleUpdate(newRole) {
    this.setState({
      role: newRole,
      hasRoleChanged: true
    });
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.getSession, 'session');
  }

  render() {
    return (
      <div className="row dcman">
        <div className="col s4 profile">
          <UserInfo changeRole={this.handleRoleUpdate}/>
        </div>
        {(this.state.role === 'viewer')
          ?
          <div className="col s8 docsList">
            <Tabs tabItemContainerStyle={styles.tab}
              inkBarStyle={{backgroundColor: "#0082ff"}}>
              <Tab label="All Docs"
                style={{color: "#0082ff"}}>
                <AllDocs hasRoleChanged={this.state.hasRoleChanged}/>
              </Tab>
            </Tabs>
          </div>
          :
          <div className="col s8 docsList">
            <Tabs tabItemContainerStyle={styles.tab}
              inkBarStyle={{backgroundColor: "#0082ff"}}>

              <Tab label="My Docs"
                style={{color: "#0082ff"}}>
                <UserDocs />
              </Tab>
              <Tab label="All Docs"
                style={{color: "#0082ff"}}>
                <AllDocs />
              </Tab>
            </Tabs>
          </div>
        }
      </div>
    );
  }
}

export default Dash;
