import { FC } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlay {
  handleClickOverlay: (target: any) => void;
}

const ModalOverlay : FC<IModalOverlay> = ({handleClickOverlay, children}) => {
  return (
    <section
      className={`${styles.overlay__section} overlay__closed`}
      onClick={handleClickOverlay}
      >
      {children}
    </section>
  )
}

export default ModalOverlay;