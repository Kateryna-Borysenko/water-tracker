import { useLockBodyScroll } from 'react-use';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import icon from '../../../assets/static/icons/x-mark.svg';
import s from './Modal.module.css';

const modalRootRef = document.querySelector('#modal-root');

const Modal = ({ onClose, children, className }) => {
  const containerClassNames = `${s.container} ${s[className]}`; //

  useLockBodyScroll(true);

  useEffect(() => {
    const onEscPress = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onEscPress);

    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={containerClassNames}>
        <button
          type="button"
          className={s.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <img src={icon} alt="Close Button" />
        </button>

        <div className={s.content}>{children}</div>
      </div>
    </div>,
    modalRootRef,
  );
};

export default Modal;

// prop types? className
