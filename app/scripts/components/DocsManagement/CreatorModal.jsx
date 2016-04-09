import React from 'react';
import Modal from 'react-modal';
import FlatButton from 'material-ui/lib/flat-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Creator from './Creator.jsx';

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
        <FloatingActionButton
          style={{color: '#0288D1'}}
          onTouchTap = {this.openModal}>
          <ContentAdd />
        </FloatingActionButton>
        <Modal
          isOpen={self.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <Creator closeModal={this.closeModal}/>
        </Modal>
      </div>
    );
  }
}
