import React from 'react';
import * as DocActions from '../../actions/DocumentActions';
import DocStore from '../../stores/DocumentStore';
import {history} from 'react-router';
import Divider from 'material-ui/lib/divider';

const styles = {
  button: {
    margin: 12,
    color: '#0288D1'
  },
  form: {
    margin: '0 auto'
  }
};

class DocDeleter extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDocDelete = this.handleDocDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    DocStore.addChangeListener(this.handleDocDelete, 'docDelete');
  }


  handleDocDelete() {
    let data = DocStore.getDocDeleteResult();
    if (data && data.error) {
      window.Materialize.toast(data.error.message, 2000, 'error-toast rounded');

    } else {
      window.Materialize.toast(data.message, 2000, 'success-toast rounded');
      let token = window.localStorage.getItem('token');
      let userId = window.localStorage.getItem('userId');
      DocActions.getUserDocs(userId, token);
      this.props.closeModal();
    }
  }

  handleDelete(event) {
    event.preventDefault();
    let token = window.localStorage.getItem('token');
    DocActions.deleteDoc(this.props.doc._id, token);
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.closeModal();
  }

  componentWillUnmount() {
    DocStore.removeChangeListener(this.handleDocDelete, 'docDelete');
  }

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleDelete}>
          <div className="center-align col s12">
          <p>Are you sure you want to <b>delete</b> this document?</p>
          <br /> <br />
          </div>
          <div className="col s6">
            <div className="container center">
              <button className="btn waves-effect header-btn red"
                  name="action"
                  type="submit"
              > Delete
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

export default DocDeleter;
