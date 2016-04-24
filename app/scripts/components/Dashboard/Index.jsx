import React from 'react';
import {browserHistory} from 'react-router';
import * as UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import UserDocs from './MyDocsList.jsx';
import Profile from './Profile.jsx';
import AllDocs from './AllDocsList.jsx';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

const styles = {
  tab: {
    backgroundColor: '#E3E2E8',
    color: "#0082ff"
  }
};

class Dash extends React.Component {
  constructor(props) {
    super(props);
    this.getSession = this.getSession.bind(this);
    this.handleRoleUpdate = this.handleRoleUpdate.bind(this);
    this.state = {
      role: ''
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
      role: newRole
    });
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.getSession, 'session');
  }

  render() {
    let roleProps = this.state.role;
    return (
      <div className="row dcman">
        <div className="col s4 profile">
          <Profile changeRole={this.handleRoleUpdate}/>
        </div>
        {(this.state.role === 'viewer')
          ?
          <div className="col s8 docsList">
            <Tabs tabItemContainerStyle={styles.tab}
              inkBarStyle={{backgroundColor: "#0082ff"}}>
              <Tab label="All Docs"
                style={{color: "#0082ff"}}>
                <AllDocs role={roleProps} />
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
                <AllDocs role={roleProps} />
              </Tab>
            </Tabs>
          </div>
        }
      </div>
    );
  }
}

export default Dash;
