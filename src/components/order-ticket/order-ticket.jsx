import styles from './order-ticket.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from 'react-redux';
import { feedOrders } from '../../services/redux/order-slice'; 
import { useParams } from 'react-router-dom';


const OrderTicket = () => {
  const orders = useSelector(feedOrders);
  const { id } = useParams();
  const currentOrder = orders.find((order) => order.id.toString() === id);

  return (
      <section className={styles.container}>
        <h2 className='text text_type_digits-default mb-10'>#0{currentOrder && currentOrder.id}</h2>
        <div className={`mb-10`}>
          <h3 className={`text text_type_main-medium mb-3`}>{currentOrder && currentOrder.name}</h3>
          <span className={`${styles.status} mb-15`}>{'Выполнен'}</span>
          <div>
            <h3 className="text text_type_main-medium mb-6">Состав:</h3>
            <ul className={`${styles.ingredients__list}`}>
              {currentOrder && currentOrder.ingredients.map((ingredient) => (
              <li className={`${styles.ingredient__item}`} key={ingredient._id + (Math.random() * (200 - 10) + 10)}>
                <div className = {styles.element}>
                  <img src={ingredient.image} alt=""/>
                </div>
                <span className={styles.ingredient__name}>{ingredient.name}</span>
                <span className={styles.ingredient__price}> 
                  {ingredient.type === 'bun' ? `2 x ${ingredient.price}` : ingredient.price} 
                  <CurrencyIcon type="primary"/> 
                </span>
              </li>))}
            </ul>
          </div>
        </div>
        <div className={`${styles.general__info}`}>
          <span className="text text_type_main-default text_color_inactive">Сегодня, 00:00 i - GMT+3</span>
          <span className={styles.total__cost}>{currentOrder && currentOrder.cost} <CurrencyIcon type={"primary"}/></span>
        </div>
      </section>
  )
}

export default OrderTicket;