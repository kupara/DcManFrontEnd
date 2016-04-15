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

class DocUpdater extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDocUpdate = this.handleDocUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      doc: {
        title: this.props.doc.title,
        content: this.props.doc.content,
        accessLevel: this.props.doc.accessLevel
      }
    }
  }

  componentWillMount() {
    DocStore.addChangeListener(this.handleDocUpdate, 'docUpdate');
  }

  handleDocUpdate() {
    let data = DocStore.getDocUpdateResult();
    if (data && data.error) {
      window.Materialize.toast(data.error.message, 2000, 'error-toast rounded');
    } else {
      window.Materialize.toast(data.message, 2000, 'success-toast rounded');
      let token = window.localStorage.getItem('token');
      let userId = window.localStorage.getItem('userId');
      DocActions.getUserDocs(userId, token);
      this.props.closeModal();
      // this.history.pushState(null, '/');
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
    DocActions.updateDoc(this.props.doc._id, this.state.doc, token);
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.closeModal();
  }

  handleChange(event, index, value) {
    this.state.doc['accessLevel'] = value;
  }

  componentWillUnmount() {
    DocStore.removeChangeListener(this.handleDocUpdate, 'docUpdate');
  }

  render() {
    return (
      <div className="row">
        <div className="col s12" style={styles.form}>
          <TextField
            name="title"
            defaultValue={this.state.doc.title}
            floatingLabelText="Document Title"
            fullWidth={true}
            onChange={this.handleFieldChange}
            /><br/>
          <TextField
            name="content"
            defaultValue={this.state.doc.content}
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
            label="Save"
            onTouchTap={this.handleSubmit}
            /> &nbsp; &nbsp;
          <RaisedButton
            label="Cancel"
            onTouchTap={this.handleCancel}
            />
        </div>
      </div>
    );
  }
}

export default DocUpdater;
