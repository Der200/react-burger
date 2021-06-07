import React from 'react';
import ProfileNav from '../components/profile-nav/profile-nav';

const Orders = () => {
  const description = 'В этом разделе вы можете просмотреть свою историю заказов';

  return (
    <section style={{display: 'flex'}}>
      <ProfileNav description={description}/>
    </section>
  )
}

export default Orders;