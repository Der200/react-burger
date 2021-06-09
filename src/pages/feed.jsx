import FeedOrder from "../components/feed-order/feed-order"
import { useSelector } from 'react-redux';
import {feedOrders} from '../services/redux/order-slice';
import { Link } from 'react-router-dom';
import styles from './feed.module.css';

const Feed = () => {
  const orders = useSelector(feedOrders);
  const mockDone = ['01324', '02347', '02343', '01234', '03457', '05644', '07456'];

  const ordersDone = mockDone.map((order) => {
    return <li className='text text_type_digits-default mb-2' key={order}>{`0${order}`}</li>
  })

  const ordersCooking = orders.map((order) => {
    return <li className='text text_type_digits-default mb-2' key={order.id}>{`0${order.id}`}</li>
  })

  return (
    <div>
      <h2 className={styles.title}>Лента заказов</h2>
      <div className={styles.wrapper}>
        <section className={styles.feed__orders}>
          {orders.length === 0 && (
            <div className={`${styles.container} p-6 mt-4`}>
              <div className={`${styles.body} mb-6`}>
                <h3>Наш репликатор готов создать твой заказ! <Link to='/'>Собрать бургер</Link></h3>
              </div>
            </div>
          )}
          {orders.map((order) => (<FeedOrder order={order} key={order.id}/>))}
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
              <span className='text text_type_digits-large'>42</span>
            </div>
            <div className={styles.day__done}>
              <h3 className='className="text text_type_main-medium'>Выполнено за сегодня:</h3>
              <span className='text text_type_digits-large'>{mockDone.length}</span>
            </div>
          </section>
        </section>
      </div>
    </div>
  )
}

export default Feed;