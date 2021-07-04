import { FC } from 'react';
import Modal from '../modal/modal';
import successImage from '../../images/success.gif';
import styles from './order-details.module.css';
import { useSelector } from 'react-redux';
import { orderDetails } from '../../services/redux/order-slice/order-slice';

interface IOrderDetails {
  handleClickOrder: (target: any) => void;
}

const OrderDetails : FC<IOrderDetails> = ({ handleClickOrder }) => {
  const order = useSelector(orderDetails)
  // @ts-ignore: Unreachable code error
  const handleClick = target => {
    // @ts-ignore: Unreachable code error
    handleClickOrder && handleClickOrder(target)
  }

  return (
    <Modal handleClickModal={handleClick}>
      <div className={styles.box}>
        <h2 className={`${styles.title} mt-8`}>{order.number}</h2>
        <span className={`${styles.active} text text_type_main-medium mt-8`}>
          идентификатор заказа
        </span>
        <div className={`${styles.image} mt-15 mb-15`}>
          <img src={successImage} alt='успех'></img>
        </div>
        <div className={`${styles.status}`}>
          <span className={`${styles.active} text text_type_main-default`}>
            Ваш заказ начали готовить
          </span>
          <span className="text text_type_main-default mt-2 mb-30">
            Дождитесь готовности на орбитальной станции
          </span>
        </div>
      </div>
    </Modal>
  )
}

export default OrderDetails;