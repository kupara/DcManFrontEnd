import React from 'react';
import {browserHistory} from 'react-router';
import * as DocActions from '../../actions/DocumentActions';
import DocStore from '../../stores/DocumentStore';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import FlatButton from 'material-ui/lib/flat-button';


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
            </CardText>
          </Card>
        </div>
      );
    }
    return (
      <div>
        {this.state.docs.map(renderDoc)}
      </div>
    );
  }
}

export default AllDocs;
