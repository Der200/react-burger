import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({handleClickOverlay, children}) => {
  return (
    <section
      className={`${styles.overlay__section} overlay__closed`}
      onClick={handleClickOverlay}
      >
      {children}
    </section>
  )
}

ModalOverlay.propTypes = {
  handleClickOverlay: PropTypes.func.isRequired
}

export default ModalOverlay;