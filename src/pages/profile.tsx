import React, { useEffect, FC, FormEventHandler, MouseEventHandler, ChangeEventHandler } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import Form from '../components/form/form';
import ProfileNav from '../components/profile-nav/profile-nav';

import { user, updateUserData, userStatus } from '../services/redux/authorization-slice/authorization-slice';

import { TAuthorizationForm } from '../utils/types';
import { useAppDispatch, useAppSelector } from '../utils/common';

const Profile : FC = () => {
  const description = 'В этом разделе вы можете изменить свои персональные данные';
  const authorizationStatus = useAppSelector(userStatus);
  const currentUser = useAppSelector(user);
  const dispatch = useAppDispatch();
  const [profileData, getProfileData] = React.useState<TAuthorizationForm>({'name': currentUser!.name, 'email': currentUser!.email, 'password': ''});
  const [visible, getVisible] = React.useState<boolean>(false);

  const cancelButtonStyle = {
    color: '#4C4CFF',
    fontSize: '16px',
    lineHeight: '24px',
    cursor: 'pointer',
    width: '58px',
    height: '24px',
    marginRight: '28px',
    marginTop: '13px',
  }

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e): void => {
    getVisible(true);
    getProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  }

  const cancelChangesHandler: MouseEventHandler = (e): void => {
    e.preventDefault();
    getVisible(false);
    getProfileData({'name': currentUser!.name, 'email': currentUser!.email, 'password': ''});
  }

  useEffect(() => {
    if(authorizationStatus === 'succeeded') {
      getProfileData({'name': currentUser!.name, 'email': currentUser!.email, 'password': ''});
    }
    // eslint-disable-next-line
  }, [authorizationStatus])

  const submitHandler: FormEventHandler = (e): void => {
    e.preventDefault();
    dispatch(updateUserData({'name': profileData.name, 'email': profileData.email, 'password': profileData.password}));
    getVisible(false);
  }

  return (
    <section style={{display: 'flex'}}>
      <ProfileNav description={description}/>
      <Form submitHandler={submitHandler}>
        <Input placeholder={'Имя'} value={profileData.name || ''} name='name' onChange={changeHandler} icon='EditIcon' />
        <Input placeholder={'Логин'} value={profileData.email || ''} name='email' onChange={changeHandler} icon='EditIcon' />
        <Input placeholder={'Пароль'} value={profileData.password || ''} name='password' onChange={changeHandler} icon='EditIcon' />
        {visible && <div style={{display: 'flex', marginLeft: 'auto', paddingRight: '20px', width: '251px'}}>
        <div onClick={cancelChangesHandler} style={cancelButtonStyle}>Отмена</div>
          <Button type='primary' size='medium'>Сохранить</Button>
        </div>}
      </Form>
    </section>
  )
}

export default Profile;