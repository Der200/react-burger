import React from 'react';
import Form from '../components/form/form';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileNav from '../components/profile-nav/profile-nav';
import { user, changeUserData } from '../services/redux/authorization-slice';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const description = 'В этом разделе вы можете изменить свои персональные данные';
  const currentUser = useSelector(user);
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    dispatch(changeUserData({
      name: e.target.name, 
      value: e.target.value
    }))
  }

  return (
    <section style={{display: 'flex'}}>
      <ProfileNav description={description}/>
      <Form>
        <Input placeholder={'Имя'} value={currentUser.name} name='name' onChange={changeHandler} icon='EditIcon' />
        <Input placeholder={'Логин'} value={currentUser.login} name='login' onChange={changeHandler} icon='EditIcon' />
        <Input placeholder={'Пароль'} value={currentUser.password} name='password' onChange={changeHandler} icon='EditIcon' />
      </Form>
    </section>
  )
}

export default Profile;