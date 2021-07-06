import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FeedOrder from '../components/feed-order/feed-order';
import ProfileNav from '../components/profile-nav/profile-nav';

import { feedOrders, setFeedOrders } from '../services/redux/order-slice/order-slice';
import { socketAuthStatus, authMessage } from '../services/redux/ws-slice/ws-slice';
import { fetchedIngredients } from "../services/redux/ingredients-slice/ingredients-slice";
import { wsAuthInit, wsAuthClose } from '../store';

import { filterData } from '../utils/common';

const Orders : FC = () => {
  const dispatch = useDispatch();
  const wsAuthStatus = useSelector(socketAuthStatus);
  const wsAuthMessage = useSelector(authMessage)
  const ingredients = useSelector(fetchedIngredients);
  const { orders } = wsAuthMessage;
  console.log(orders)
  // let userOrdersData = [];

  React.useEffect(() => {
    if (!wsAuthStatus) {
      dispatch(wsAuthInit());
    }
    return () => {
      dispatch(wsAuthClose());
    }
  }, [dispatch])

  React.useEffect(() => {
    if (wsAuthStatus && orders) {
      dispatch(setFeedOrders(filterData(orders, ingredients)))
    }
  }, [wsAuthMessage.length, wsAuthStatus])

  // if(wsAuthStatus) {
  //   userOrdersData = filterData(orders, ingredients);  
  // }

  const description = 'В этом разделе вы можете просмотреть свою историю заказов';
  const userOrdersData = useSelector(feedOrders);
  return (
    <section style={{display: 'flex'}}>
      <ProfileNav description={description}/>
      <section style={{marginTop: '40px', marginLeft: `10px`, height: '868px', overflowY: 'auto'}}>
        {userOrdersData.map((order) => <FeedOrder order={order} status={order.status} key={order.number}/>).reverse()}
      </section>
    </section>
  )
}

export default Orders;