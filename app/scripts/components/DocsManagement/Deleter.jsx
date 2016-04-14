import React from 'react';
import * as DocActions from '../../actions/DocumentActions';
import DocStore from '../../stores/DocumentStore';
import {history} from 'react-router';
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

class DocDeleter extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDocDelete = this.handleDocDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    DocStore.on('docDelete', this.handleDocDelete);
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
        <div className="col s12" style={styles.form}>
          <p>Are you sure you want to delete this Document?</p>
          <br/>
          <RaisedButton
            label="Delete"
            onTouchTap={this.handleDelete}
            labelStyle={{color: 'red'}}
            />
          &nbsp; &nbsp;
          <RaisedButton
            label="Cancel"
            onTouchTap={this.handleCancel}
            />
        </div>
      </div>
    );
  }
}

export default DocDeleter;
