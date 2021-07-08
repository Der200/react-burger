import React, { FC } from 'react';

import FeedOrder from '../components/feed-order/feed-order';
import ProfileNav from '../components/profile-nav/profile-nav';

import { feedOrders, setFeedOrders } from '../services/redux/order-slice/order-slice';
import { socketAuthStatus, authMessage } from '../services/redux/ws-slice/ws-slice';
import { fetchedIngredients } from "../services/redux/ingredients-slice/ingredients-slice";
import { wsAuthInit, wsAuthClose } from '../store';

import { filterData, useAppDispatch, useAppSelector } from '../utils/common';

const Orders : FC = () => {
  const dispatch = useAppDispatch();
  const wsAuthStatus = useAppSelector(socketAuthStatus);
  const wsAuthMessage = useAppSelector(authMessage)
  const ingredients = useAppSelector(fetchedIngredients);

  React.useEffect(() => {
    if (!wsAuthStatus) {
      dispatch(wsAuthInit());
    }
    return () => {
      dispatch(wsAuthClose());
    }
    // eslint-disable-next-line
  }, [dispatch])

  React.useEffect(() => {
    if (wsAuthStatus && wsAuthMessage) {
      dispatch(setFeedOrders(filterData(wsAuthMessage!.orders, ingredients)))
    }
    // eslint-disable-next-line
  }, [wsAuthMessage, wsAuthStatus])

  const description: string = 'В этом разделе вы можете просмотреть свою историю заказов';
  const userOrdersData = useAppSelector(feedOrders);
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