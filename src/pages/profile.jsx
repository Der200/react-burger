import React from 'react';
import Form from '../components/form/form';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileNav from '../components/profile-nav/profile-nav';

const Profile = () => {
  const description = 'В этом разделе вы можете изменить свои персональные данные';

  return (
    <section style={{display: 'flex'}}>
      <ProfileNav description={description}/>
      <Form>
        <Input placeholder={'Имя'} value={''} onChange={() => {}}/>
        <Input placeholder={'Логин'} value={''} onChange={() => {}}/>
        <Input placeholder={'Пароль'} value={''} onChange={() => {}}/>
      </Form>
    </section>
  )
}

export default Profile;