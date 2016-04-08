import React from 'react';
import DocActions from '../../actions/DocumentActions';
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
let token = window.localStorage.getItem('token');
let userId = window.localStorage.getItem('userId');

class DocDeleter extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDocDelete = this.handleDocDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    DocStore.on('docDelete', this.handleDocDelete);
    if (token) {
    }
  }


  handleDocDelete() {
    let data = DocStore.getDocDeleteResult();
    if (data && data.error) {
      console.log(data.error);
    } else {
      console.log('Doc Deleted Successfully', data);
      DocActions.getUserDocs(userId, token);
      this.props.closeModal();
    }
  }

  handleDelete(event) {
    event.preventDefault();
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
