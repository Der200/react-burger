import { FC } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';

import ModalOverlay from '../modal-overlay/modal-overlay';

const {modal, active, modal__header, modal__close} = styles;

interface IModal {
  title?: string;
  handleClickModal?: (target: any) => void;
}

const Modal : FC<IModal> = ({title, children, handleClickModal}) => {
  const history = useHistory()
  
  const modalRoot: HTMLElement | null = document.getElementById('app-modals');
  
  
  const handleClick = (element: any): void => {
    handleClickModal && handleClickModal(element.target);
    history.replace(`/`);
  }

  return modalRoot && ReactDOM.createPortal(
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
    modalRoot
  )

}

export default Modal;