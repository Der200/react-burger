import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const {modal, active, modal__header, modal__close} = styles;

const Modal = (props) => {
  const history = useHistory()
  
  const modalRoot = document.getElementById('app-modals');
  const handleClick = element => {
    props.handleClickModal && props.handleClickModal(element.target);
    history.replace(`/`);
  }

  return ReactDOM.createPortal(
    <ModalOverlay handleClickOverlay={handleClick}>
      <div className={`${modal} pt-5 pl-5 pr-5`}>
        <div className={`${modal__header} mt-10 mr-10 ml-10`}>
          <span className={`${active} text text_type_main-large`}>
            {props.title}
          </span>
          <span className={`${modal__close} closed`}>
            <CloseIcon />
          </span>
        </div>
        {props.children}
      </div>
    </ModalOverlay>,
    modalRoot
  )

}

Modal.propTypes = {
  title: PropTypes.string,
  handleClickModal: PropTypes.func.isRequired
}

export default Modal;