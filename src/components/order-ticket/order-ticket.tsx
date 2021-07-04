import styles from './order-ticket.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentOrder, order } from '../../services/redux/order-slice/order-slice'; 
import { useParams } from 'react-router-dom';
import { useEffect, FC } from 'react';
import Preloader from '../preloader/preloader';

interface IOrderTicket {
  status?: string;
  type?: string | undefined;
}

const OrderTicket : FC<IOrderTicket> = ({status, type}) => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setCurrentOrder(Number(id)));
  }, [])
  const currentOrder = useSelector(order);

  if (!currentOrder) {
    return <Preloader />
  }

  return (
      <section className={`${styles.container} ${type === 'modal' ? styles.modal : ''}`}>
        {type !== 'modal' && <h2 className='text text_type_digits-default mb-10'>#0{currentOrder.number}</h2>}
        <div className={`mb-10`}>
          <h3 className={`text text_type_main-medium mb-3`}>{currentOrder.name}</h3>
          <span className={`${styles.status} mb-15`}>{status ? status : 'Выполнен'}</span>
          <div>
            <h3 className="text text_type_main-medium mb-6">Состав:</h3>
            <ul className={`${styles.ingredients__list}`}>
              {currentOrder.ingredients.map((ingredient) => (
              <li className={`${styles.ingredient__item}`} key={ingredient._id + (Math.random() * (200 - 10) + 10)}>
                <div className = {styles.element}>
                  <img src={ingredient.image} alt={ingredient.name}/>
                </div>
                <span className={styles.ingredient__name}>{ingredient.name}</span>
                <span className={styles.ingredient__price}> 
                  {ingredient.type === 'bun' ? `2 x ${ingredient.price}` : `1 x ${ingredient.price}`} 
                  <CurrencyIcon type="primary"/> 
                </span>
              </li>))}
            </ul>
          </div>
        </div>
        <div className={`${styles.general__info}`}>
          <span className="text text_type_main-default text_color_inactive">Сегодня, 00:00 i - GMT+3</span>
          <span className={styles.total__cost}>{currentOrder.price} <CurrencyIcon type={"primary"}/></span>
        </div>
      </section>
  )
}

export default OrderTicket;