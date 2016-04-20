import React from 'react';
import * as DocActions from '../../actions/DocumentActions';
import DocStore from '../../stores/DocumentStore';
import {history} from 'react-router';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';


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
      if (this.props.closeModal !== undefined) {
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

  handleSubmit(event) {
    event.preventDefault();
    let token = window.localStorage.getItem('token');
    DocActions.updateDoc(this.props.doc._id, this.state.doc, token);
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.closeModal();
  }

  handleChange(event, index, value) {
    this.state.doc['accessLevel'] = value;
    this.setState({
      doc: this.state.doc
    });
  }

  componentWillUnmount() {
    DocStore.removeChangeListener(this.handleDocUpdate, 'docUpdate');
  }

  render() {
    return (
      <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="input-field col s12">
              <input className="validate"
                  id="title"
                  name="title"
                  value={this.state.doc.title}
                  onChange={this.handleFieldChange}
                  type="text"
              />
            <label className="active" htmlFor="title">Document Title</label>
            </div>
            <div className="input-field col s12">
              <textarea className="validate materialize-textarea"
                  id="content"
                  name="content"
                  value={this.state.doc.content}
                  onChange={this.handleFieldChange}
              />
              <label className="active" htmlFor="content">Content</label>
            </div>
            <span>Select Access Level:</span> <br/>
            <SelectField value={this.state.doc.accessLevel} onChange={this.handleChange}>
              <MenuItem value={"admin"} primaryText="Admin"/>
              <MenuItem value={"private"} primaryText="Private"/>
              <MenuItem value={"public"} primaryText="Public"/>
            </SelectField><br/><br/>
            <div className="col s6">
              <div className="container center">
                <button className="btn waves-effect header-btn blue"
                    name="action"
                    type="submit"
                > Save
                </button>
              </div>
            </div>
            <div className="col s6">
              <div className="container center">
                <button className="btn waves-effect header-btn blue"
                    name="action"
                    type="cancel"
                    onClick={this.handleCancel}
                > Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
    );
  }
}

export default DocUpdater;
