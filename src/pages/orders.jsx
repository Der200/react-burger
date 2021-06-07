import React from 'react';
import FeedOrder from '../components/feed-order/feed-order';
import ProfileNav from '../components/profile-nav/profile-nav';
import { feedOrders } from '../services/redux/order-slice';
import { useSelector } from 'react-redux';

const Orders = () => {
  const description = 'В этом разделе вы можете просмотреть свою историю заказов';
  const orders = useSelector(feedOrders);
  return (
    <section style={{display: 'flex'}}>
      <ProfileNav description={description}/>
      <section style={{marginTop: '40px', marginLeft: `10px`, height: '868px', overflowY: 'auto'}}>
        {orders.map((order) => <FeedOrder order={order} status={'cooking'}/>)}
      </section>
    </section>
  )
}

export default Orders;