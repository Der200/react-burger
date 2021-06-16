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
      <Form submitHandler={submitHandler}>
        <Input placeholder={'Имя'} value={profileData.name} name='name' onChange={changeHandler} icon='EditIcon' />
        <Input placeholder={'Логин'} value={profileData.email} name='email' onChange={changeHandler} icon='EditIcon' />
        <Input placeholder={'Пароль'} value={profileData.password} name='password' onChange={changeHandler} icon='EditIcon' />
        {visible && <div style={{display: 'flex', marginLeft: 'auto', paddingRight: '20px', width: '251px'}}>
          <div type='button' onClick={cancelChangesHandler} style={cancelButtonStyle}>Отмена</div>
          <div type='submit'>
            <Button type='primary' size='medium'>Сохранить</Button>
          </div>
        </div>}
      </Form>
    </section>
  )
}

export default Profile;