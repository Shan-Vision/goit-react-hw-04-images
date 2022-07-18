import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalBackdrop, ModalWindow } from './Modal.styled';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, largeImage }) => {
  useEffect(() => {
    const onEscapeClick = event => {
      if (event.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEscapeClick);

    return () => {
      window.removeEventListener('keydown', onEscapeClick);
    };
  }, [onClose]);

  const onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <ModalBackdrop onClick={onBackdropClick}>
      <ModalWindow onClick={onClose}>
        <img src={largeImage} alt="Large type" />
      </ModalWindow>
    </ModalBackdrop>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
export default Modal;
