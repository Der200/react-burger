import React, { useEffect } from 'react';
import Form from '../components/form/form';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileNav from '../components/profile-nav/profile-nav';
import { user, updateUserData, userStatus } from '../services/redux/authorization-slice';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const description = 'В этом разделе вы можете изменить свои персональные данные';
  const authorizationStatus = useSelector(userStatus);
  const currentUser = useSelector(user);
  const dispatch = useDispatch();
  const [profileData, getProfileData] = React.useState({'name': currentUser.name, 'email': currentUser.email, 'password': ''});
  const [visible, getVisible] = React.useState(false);

  const changeHandler = (e) => {
    getVisible(true);
    getProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  }

  const cancelChangesHandler = (e) => {
    e.preventDefault();
    getVisible(false);
    getProfileData({'name': currentUser.name, 'email': currentUser.email, 'password': ''});
  }

  useEffect(() => {
    if(authorizationStatus === 'succeeded') {
      getProfileData({'name': currentUser.name, 'email': currentUser.email, 'password': ''});
    }
  }, [authorizationStatus])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserData({'name': profileData.name, 'email': profileData.email, 'password': profileData.password}));
    getVisible(false);
  }

  return (
    <section style={{display: 'flex'}}>
      <ProfileNav description={description}/>
      <Form>
        <Input placeholder={'Имя'} value={profileData.name} name='name' onChange={changeHandler} icon='EditIcon' />
        <Input placeholder={'Логин'} value={profileData.email} name='email' onChange={changeHandler} icon='EditIcon' />
        <Input placeholder={'Пароль'} value={profileData.password} name='password' onChange={changeHandler} icon='EditIcon' />
        {visible && <div style={{display: 'flex', marginLeft: 'auto', paddingRight: '70px', width: '251px'}}>
          <Button type='secondary' size='large' onClick={cancelChangesHandler}>Отмена</Button>
          <Button type='primary' size='medium' onClick={submitHandler}>Сохранить</Button>
        </div>}
      </Form>
    </section>
  )
}

export default Profile;