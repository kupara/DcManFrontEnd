import React from 'react';
import {browserHistory} from 'react-router';
import * as DocActions from '../../actions/DocumentActions';
import DocStore from '../../stores/DocumentStore';
import CreatorModal from '../DocsManagement/CreatorModal.jsx';
import UpdaterModal from '../DocsManagement/UpdaterModal.jsx';
import DeleteModal from '../DocsManagement/DeleteModal.jsx';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

const styles = {
  paddingBottom: '10px',
  paddingRight: '30px',
  textAlign: 'right'
};

class UserDocs extends React.Component {
  constructor(props) {
    super(props);
    this.getUserDocs = this.getUserDocs.bind(this);
    this.state = {
      docs: []
    }
  }

  componentWillMount() {
    DocStore.addChangeListener(this.getUserDocs, 'getUserDocs');
  }

  componentDidMount() {
    let token = window.localStorage.getItem('token');
    let userId = window.localStorage.getItem('userId');
    if(token) {
      DocActions.getUserDocs(userId, token);

    }
  }

  getUserDocs() {
    let data = DocStore.getUserDocs();
    let token = window.localStorage.getItem('token');
    DocActions.getAllDocs(token);
    if (data) {
      this.setState({
        docs: data
      });
    }
  }

  componentWillUnmount() {
    DocStore.removeChangeListener(this.getUserDocs, 'getUserDocs');
  }

  render() {
    let renderDoc = function(doc) {
      return (
        <div key={doc._id}>
          <Card style={{marginTop: 20}}>
            <CardHeader
              title={doc.title}
              subtitle={"Created on "+ new Date(doc.dateCreated).toLocaleDateString()}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText
              expandable={true}>
              {doc.content}
            </CardText>
            <CardActions
              expandable={true}
              style={styles}>
              <UpdaterModal doc={doc}/>
              <DeleteModal doc={doc}/>
            </CardActions>
          </Card>
        </div>
      );
    }
    return (
      <div>
        {this.state.docs.map(renderDoc)}
        <CreatorModal />
      </div>
    );
  }
}

export default UserDocs;
