import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
const modalRef = document.querySelector('#modal-root');

export const Modal = ({ largeImg, onClose }) => {
  // close by esc
  //effects
  useEffect(() => {
    console.log('aafasf');
    // activate close by esc
    window.addEventListener('keydown', onCloseByEsc);
    function onCloseByEsc(e) {
      console.log(e.code);
      if (e.code === 'Escape') {
        // onClose();
      }
    }
    // disable close by esc
    return window.removeEventListener('keydown', onCloseByEsc);
  }, []);

  // render
  // onClick = { onClose };
  return createPortal(
    <div className="Overlay">
      <div className="Modal">
        <img src={largeImg} alt="" />
      </div>
    </div>,
    modalRef
  );
};

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
