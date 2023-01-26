import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
const modalRef = document.querySelector('#modal-root');
export const Modal = ({ largeImg, onClose }) => {
  // close by esc
  const onCloseByEsc = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  //effects
  useEffect(() => {
    // activate close by esc
    window.addEventListener('keydown', onCloseByEsc);
    // disable close by esc
    return window.removeEventListener('keydown', onCloseByEsc);
  }, []);

  // render
  createPortal(
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={largeImg} alt="" />
      </div>
    </div>,
    modalRef
  );
  return null;
};

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
