import React, { FC } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import Form from '../components/form/form';

import { resetPassword, recoveryCodeStatus } from '../services/redux/authorization-slice/authorization-slice';

import { TAuthorizationForm } from '../utils/types';

const ResetPassword : FC = () => {
  const [resetData, getResetData] = React.useState<TAuthorizationForm>({'password': '', 'code': ''});
  const recoveryStatus = useSelector(recoveryCodeStatus);
  const dispatch = useDispatch();
  const history = useHistory();

  const changeHandler = (e) => {
    getResetData({
      ...resetData,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    // @ts-ignore
    dispatch(resetPassword({'password': resetData.password, 'token': resetData.code}))
    history.replace({pathname: '/login'});
  }

  const description = () => {
    return (
      <p>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
    )
  };

  if (localStorage.getItem('refreshToken') !== null) {
    return <Redirect to='/profile'/>
  }

  if (!recoveryStatus) {
    return <Redirect to='/forgot-password'/>
  }

  return (
    // @ts-ignore
  <Form title={'Восстановление пароля'} description={description()} submitHandler={submitHandler}>
    <Input type={'password'} placeholder={'Введите новый пароль'} value={resetData.password || ''} name='password' onChange={changeHandler}/>
    <Input placeholder={'Введите код из письма'} value={resetData.code || ''} name='code' onChange={changeHandler}/>
    <Button>Сохранить</Button>
  </Form>
  )

}

export default ResetPassword;