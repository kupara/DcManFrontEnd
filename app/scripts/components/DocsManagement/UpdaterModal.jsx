import React from 'react';
import Modal from 'react-modal';
import FlatButton from 'material-ui/lib/flat-button';
import Updater from './Updater.jsx';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class CreatorModal extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this)
    this.state = {
      modalIsOpen: false
    };
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    let self = this;
    return (
      <div>
        <FlatButton
          label="Edit"
          onTouchTap = {this.openModal}
          labelStyle={{color: '#0288D1'}} />
        <Modal
          isOpen={self.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <Updater doc = {this.props.doc} closeModal={this.closeModal}/>
        </Modal>
      </div>
    );
  }
}
