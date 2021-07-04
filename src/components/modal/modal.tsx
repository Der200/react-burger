import { FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useHistory } from 'react-router-dom';

const {modal, active, modal__header, modal__close} = styles;

interface IModal {
  title?: string;
  handleClickModal: (target: any) => void;
}

const Modal : FC<IModal> = ({title, children, handleClickModal}) => {
  const history = useHistory()
  
  const modalRoot = document.getElementById('app-modals');
  const handleClick = element => {
    // @ts-ignore: Unreachable code error
    handleClickModal && handleClickModal(element.target);
    history.replace(`/`);
  }

  return ReactDOM.createPortal(
    <ModalOverlay handleClickOverlay={handleClick}>
      <div className={`${modal} pt-5 pl-5 pr-5`}>
        <div className={`${modal__header} mt-10 mr-10 ml-10`}>
          <span className={`${active} text text_type_main-large`}>
            {title}
          </span>
          <span className={`${modal__close} closed`}>
            <CloseIcon type = "primary"/>
          </span>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    // @ts-ignore: Unreachable code error
    modalRoot
  )

}

export default Modal;