import { useEffect } from "react";
import FeedOrder from "../components/feed-order/feed-order"
import { useSelector, useDispatch } from 'react-redux';
import {feedOrders} from '../services/redux/order-slice/order-slice';
import { Link } from 'react-router-dom';
import styles from './feed.module.css';
import { createAction } from '@reduxjs/toolkit';
import { socketStatus, message } from "../services/redux/ws-slice/ws-slice";
import { fetchedIngredients } from "../services/redux/ingredients-slice/ingredients-slice";


const Feed = () => {
  const filterData = (wsOrders, ingredientsArrow) => {
    const templateOrders = [];
    templateOrders.push(wsOrders.map((order) => {
      templateOrders.push({'number': order.number, 
                           'status': order.status, 
                           'name': order.name,
                           'ingredients': order.ingredients.map((ingredient) => ingredientsArrow.filter((baseIngredient) => baseIngredient._id === ingredient)[0]),
                           'price': order.ingredients.map((ingredient) => ingredientsArrow.filter((baseIngredient) => baseIngredient._id === ingredient)[0]).reduce((accum, currentValue) => {return accum + currentValue.price}, 0)
      })
    }))
    templateOrders.pop()
    return templateOrders;
  }

  const wsStatus = useSelector(socketStatus);
  const ingredients = useSelector(fetchedIngredients);
  const dispatch = useDispatch();
  const wsInit = createAction('WS_CONNECTION_START');
  const wsClose = createAction('WS_CLOSE');
  const orderss = useSelector(feedOrders);
  const wsMessage = useSelector(message);
  const { orders = [], total, totalToday} = wsMessage;
  let ordersData = []
  
  useEffect(() => {
    if (!wsStatus) {
      dispatch(wsInit());
    }
  
    return () => {
      dispatch(wsClose())
      
    }
  }, [dispatch])

  if(wsStatus) {
    ordersData = filterData(orders, ingredients);
  }
  // console.log(orderss)
  // console.log(orders)
  console.log(ordersData)



  const mockDone = ['01324', '02347', '02343', '01234', '03457', '05644', '07456'];

  const ordersDone = ordersData.map((order) => {
    return <li className='text text_type_digits-default mb-2' key={order.number}>{`${order.number}`}</li>
  })

  const ordersCooking = orderss.map((order) => {
    return <li className='text text_type_digits-default mb-2' key={order.id}>{`0${order.id}`}</li>
  })
  
  return (
    <div>
      <h2 className={styles.title}>Лента заказов</h2>
      <div className={styles.wrapper}>
        <section className={styles.feed__orders}>
          {!ordersData && (
            <div className={`${styles.container} p-6 mt-4`}>
              <div className={`${styles.body} mb-6`}>
                <h3>Наш репликатор готов создать твой заказ! <Link to='/'>Собрать бургер</Link></h3>
              </div>
            </div>
          )}
          {ordersData.map((order) => (<FeedOrder order={order} key={order.number}/>))}
        </section>
        <section className={styles.stats}>
          <section className={styles.specific}>
            <div className={styles.done}>
              <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
              <ul className={styles.orders__list}>
                {ordersDone ?? ordersDone}
              </ul>
            </div>
            <div className={styles.cooking}>
              <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
              <ul className={styles.orders__list}>
                {ordersCooking}
              </ul>
            </div>
          </section>
          <section className={styles.total__stats}>
            <div className={styles.total__done}>
              <h3 className='className="text text_type_main-medium'>Выполнено за всё время:</h3>
              <span className='text text_type_digits-large'>{total}</span>
            </div>
            <div className={styles.day__done}>
              <h3 className='className="text text_type_main-medium'>Выполнено за сегодня:</h3>
              <span className='text text_type_digits-large'>{totalToday}</span>
            </div>
          </section>
        </section>
      </div>
    </div>
  )
}

export default Feed;