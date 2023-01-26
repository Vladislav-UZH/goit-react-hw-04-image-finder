import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
const modalRef = document.querySelector('#modal-root');
export class Modal extends Component {
  static propTypes = {
    largeImg: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseByEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseByEsc);
  }
  onCloseByEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  render() {
    const { largeImg, onClose } = this.props;

    return createPortal(
      <div className="Overlay" onClick={onClose}>
        <div className="Modal">
          <img src={largeImg} alt="" />
        </div>
      </div>,
      modalRef
    );
  }
}
