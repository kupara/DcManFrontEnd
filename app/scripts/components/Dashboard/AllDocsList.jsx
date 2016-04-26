import React from 'react';
import {browserHistory} from 'react-router';
import * as DocActions from '../../actions/DocumentActions';
import DocStore from '../../stores/DocumentStore';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import FlatButton from 'material-ui/lib/flat-button';
import CardActions from 'material-ui/lib/card/card-actions';
import UpdaterModal from '../DocsManagement/UpdaterModal.jsx';
import DeleteModal from '../DocsManagement/DeleteModal.jsx';
import CreatorModal from '../DocsManagement/CreatorModal.jsx';

const styles = {
  paddingBottom: '10px',
  paddingRight: '30px',
  textAlign: 'right'
};

class AllDocs extends React.Component {
  constructor(props) {
    super(props);
    this.getAllDocs = this.getAllDocs.bind(this);
    this.state = {
      docs: []
    }
  }

  componentWillMount() {
    DocStore.addChangeListener(this.getAllDocs, 'setDocs');
  }

  componentDidMount() {
    let token = window.localStorage.getItem('token');
    if(token) {
      DocActions.getAllDocs(token);
    }
  }

  getAllDocs() {
    let data = DocStore.getAllDocs();
    if (data) {
      this.setState({
        docs: data
      });
    }
  }

  componentWillUnmount() {
    DocStore.removeChangeListener(this.getAllDocs, 'setDocs');
  }

  render() {
    let self = this;
    let renderDoc = function(doc) {
      return (
        <div key={doc._id}>
          <Card style={{marginTop: 20}}>
            <CardHeader
              title={doc.title}
              subtitle={"Created on "+ new Date(doc.dateCreated).toLocaleDateString() + " by " + doc.ownerId.username}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              {doc.content}
            </CardText> {
              (self.props.role === 'admin')
              ?
              <CardActions
                expandable={true}
                style={styles}>
                <UpdaterModal doc={doc}/>
                <DeleteModal doc={doc}/>
              </CardActions>
              :
              <span></span>
              }
            }
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

export default AllDocs;
