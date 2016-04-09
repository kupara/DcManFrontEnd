import React from 'react';
import DocActions from '../../actions/DocumentActions';
import DocStore from '../../stores/DocumentStore';
import {history} from 'react-router';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

const styles = {
  button: {
    margin: 12,
    color: '#0288D1'
  },
  form: {
    margin: '0 auto'
  }
};

let userId = window.localStorage.getItem('userId');
let token = window.localStorage.getItem('token');

class DocCreator extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleDocCreation = this.handleDocCreation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      doc: {
        title: '',
        content: '',
        ownerId: userId
      }
    }
  }

  componentDidMount() {
    DocStore.addChangeListener(this.handleDocCreation, 'docCreation');
    if (token) {
      // console.log(token);
    }
  }


  handleDocCreation() {
    let data = DocStore.getDocCreationResult();
    if (data) {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log('Doc Created Successfully', data);
        DocActions.getUserDocs(userId, token);
        this.props.closeModal();
        // this.history.pushState(null, '/');
      }
    }
  }

  handleFieldChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    this.state.doc[field] = value;
    this.setState({doc: this.state.doc});
  }

  handleSubmit(event) {
    event.preventDefault();
    DocActions.createDoc(this.state.doc, token);
  }

  componentWillUnmount() {
    DocStore.removeChangeListener(this.handleDocCreation, 'docCreation');
  }

  render() {
    return (
      <div className="row">
        <div className="col s12" style={styles.form}>
          <TextField
            name="title"
            floatingLabelText="Document Title"
            fullWidth={true}
            onChange={this.handleFieldChange}
            /><br/>
          <TextField
            name="content"
            floatingLabelText="Document Content"
            multiLine={true}
            rows={4}
            onChange={this.handleFieldChange}
            /><br/>
          <br/>
          <RaisedButton
            label="Create"
            onTouchTap={this.handleSubmit}
            />
        </div>
      </div>
    );
  }
}

export default DocCreator;
