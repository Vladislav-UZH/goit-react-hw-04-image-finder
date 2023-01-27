import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImg, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onCloseByEsc);
    function onCloseByEsc(e) {
      if (e.code === 'Escape') {
        onClose();
      }
    }
    return () => window.removeEventListener('keydown', onCloseByEsc);
  }, [onClose]);
  const handleCloseByOverlay = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onClose();
  };
  return createPortal(
    <div className="Overlay" onClick={handleCloseByOverlay}>
      <div className="Modal">
        <img src={largeImg} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
