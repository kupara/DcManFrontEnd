import React from 'react';
import * as DocActions from '../../actions/DocumentActions';
import DocStore from '../../stores/DocumentStore';
import {history} from 'react-router';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
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

class DocCreator extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDocCreation = this.handleDocCreation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    let userId = window.localStorage.getItem('userId');
    this.state = {
      doc: {
        title: '',
        content: '',
        ownerId: userId,
        accessLevel: 'private'
      }
    }
  }

  componentDidMount() {
    DocStore.addChangeListener(this.handleDocCreation, 'docCreation');
  }


  handleDocCreation() {
    let data = DocStore.getDocCreationResult();
    if (data) {
      if (data.error) {
        window.Materialize.toast(data.error.message, 2000, 'error-toast rounded');
      } else {
        let token = window.localStorage.getItem('token');
        let userId = window.localStorage.getItem('userId');
        window.Materialize.toast(data.message, 2000, 'success-toast rounded');
        DocActions.getUserDocs(userId, token);
        this.props.closeModal();
      }
    }
  }

  handleFieldChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    this.state.doc[field] = value;
    this.setState({doc: this.state.doc});
  }

  handleChange(event, index, value) {
    this.state.doc['accessLevel'] = value;
    this.setState({doc: this.state.doc});
  }

  handleSubmit(event) {
    event.preventDefault();
    let token = window.localStorage.getItem('token');
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
          <span>Select Access Level:</span> &nbsp;
          <SelectField value={this.state.accessLevel} onChange={this.handleChange}>
            <MenuItem value={"admin"} primaryText="admin"/>
            <MenuItem value={"private"} primaryText="private"/>
            <MenuItem value={"public"} primaryText="public"/>
          </SelectField><br/><br/>
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
