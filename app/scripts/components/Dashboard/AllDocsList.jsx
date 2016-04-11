import React from 'react';
import {browserHistory} from 'react-router';
import DocActions from '../../actions/DocumentActions';
import DocStore from '../../stores/DocumentStore';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import FlatButton from 'material-ui/lib/flat-button';


class DocsList extends React.Component {
  constructor(props) {
    super(props);
    this.getAllDocs = this.getAllDocs.bind(this);
    this.state = {
      docs: []
    }
  }

  componentDidMount() {
    DocStore.addChangeListener(this.getAllDocs, 'setDocs');
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
              subtitle={"Created on "+ new Date(doc.dateCreated).toLocaleDateString()}
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

export default DocsList;
