import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import successImage from '../../images/success.gif';
import styles from './order-details.module.css';

const {box, title, image, status, active} = styles;

const OrderDetails = ({ handleClickOrder, orderNumber }) => {
  const handleClick = target => {
    handleClickOrder && handleClickOrder(target)
  }
  return (
    <Modal handleClickModal={handleClick}>
      <div className={box}>
        <h2 className={`${title} mt-8`}>{orderNumber}</h2>
        <span className={`${active} text text_type_main-medium mt-8`}>
          идентификатор заказа
        </span>
        <div className={`${image} mt-15 mb-15`}>
          <img src={successImage} alt='success'></img>
        </div>
        <div className={`${status}`}>
          <span className={`${active} text text_type_main-default`}>
            Ваш заказ начали готовить
          </span>
          <span className='text text_type_main-default mt-2 mb-30'>
            Дождитесь готовности на орбитальной станции
          </span>
        </div>
      </div>
    </Modal>
  )
}

OrderDetails.propType = {
  orderNumber: PropTypes.string.isRequired,
  handleClickOrder: PropTypes.func.isRequired
}

export default OrderDetails;