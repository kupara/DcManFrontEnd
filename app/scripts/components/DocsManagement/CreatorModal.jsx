import React from 'react';
import Modal from 'react-modal';
import FlatButton from 'material-ui/lib/flat-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Creator from './Creator.jsx';

const customStyles = {
  overlay : {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10
  },
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    color: 'rgba(90,76,76,0.26)',
    zIndex: 10,
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  floatingButton : {
    position: 'fixed',
    right: '12px',
    bottom: '75px'
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
          style={customStyles.floatingButton}
          onTouchTap = {this.openModal}
          backgroundColor="#0082ff">
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
