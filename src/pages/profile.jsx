import React from 'react';
import Form from '../components/form/form';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileNav from '../components/profile-nav/profile-nav';

const Profile = () => {


  return (
    <section style={{display: 'flex'}}>
      <ProfileNav />
      <Form>
        <Input placeholder={'Имя'} value={''} />
        <Input placeholder={'Логин'} value={''} />
        <Input placeholder={'Пароль'} value={''} />
      </Form>
    </section>
  )
}

export default Profile;