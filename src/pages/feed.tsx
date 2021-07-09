import { useEffect, FC } from "react";
import { Link } from 'react-router-dom';

import styles from './feed.module.css';

import FeedOrder from "../components/feed-order/feed-order";

import { setFeedOrders } from '../services/redux/order-slice/order-slice';
import { socketStatus, message } from "../services/redux/ws-slice/ws-slice";
import { fetchedIngredients } from "../services/redux/ingredients-slice/ingredients-slice";
import { wsInit, wsClose } from "../store";

import { filterData, useAppDispatch, useAppSelector } from "../utils/common";
import { TOrderObject } from "../utils/types";
import Preloader from "../components/preloader/preloader";


const Feed : FC = () => {

  const wsStatus = useAppSelector(socketStatus);
  const ingredients = useAppSelector(fetchedIngredients);
  const dispatch = useAppDispatch();
  const wsMessage = useAppSelector(message);
  let ordersData = []
  
  useEffect(() => {
    if (!wsStatus) {
      dispatch(wsInit());
    }
    
    return () => {
      dispatch(wsClose())
    }
    // eslint-disable-next-line
  }, [dispatch])

  useEffect(() => {
    if (wsMessage) {
      dispatch(setFeedOrders(filterData(wsMessage!.orders, ingredients)))
    }
    // eslint-disable-next-line
  }, [wsMessage])


  if(wsMessage) {
    ordersData = filterData(wsMessage!.orders, ingredients);  
  }

  if(!wsMessage) {
    return <Preloader />
  }

  const ordersDone = ordersData.map((order : TOrderObject, index: number) : JSX.Element | undefined => {
    if (index < 50) {
      return (<li className='text text_type_digits-default mb-2' key={order.number + (Math.random() * (200 - 10) + 10)} >{`${order.number}`}</li>)
    }
    return undefined
  })

  // const ordersCooking = orderss.map((order) => {
  //   return <li className='text text_type_digits-default mb-2' key={order.id}>{`0${order.id}`}</li>
  // })
  
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
          {ordersData.map((order : TOrderObject) => (<FeedOrder order={order} key={order.number + (Math.random() * (200 - 10) + 10)}/>))}
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
                {/* {ordersCooking} */}
              </ul>
            </div>
          </section>
          <section className={styles.total__stats}>
            <div className={styles.total__done}>
              <h3 className='className="text text_type_main-medium'>Выполнено за всё время:</h3>
              <span className='text text_type_digits-large'>{wsMessage!.total}</span>
            </div>
            <div className={styles.day__done}>
              <h3 className='className="text text_type_main-medium'>Выполнено за сегодня:</h3>
              <span className='text text_type_digits-large'>{wsMessage!.totalToday}</span>
            </div>
          </section>
        </section>
      </div>
    </div>
  )
}

export default Feed;