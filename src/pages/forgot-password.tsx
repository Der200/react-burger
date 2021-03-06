import React, { FC, FormEventHandler, ChangeEventHandler } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import Form from '../components/form/form';

import { forgotPassword } from '../services/redux/authorization-slice/authorization-slice';

import { TAuthorizationForm } from '../utils/types';
import { useAppDispatch } from '../utils/common';


const ForgotPassword : FC = () => {
  const [forgotData, getForgotData] = React.useState<TAuthorizationForm>({'email': ''});
  const dispatch = useAppDispatch();
  const history = useHistory();

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e): void => {
    getForgotData({...forgotData, [e.target.name]: e.target.value})
  }

  const submitHandler: FormEventHandler = (e): void => {
    e.preventDefault();
    dispatch(forgotPassword({'email': forgotData.email}));
    history.replace({ pathname: '/reset-password' })
  }

  if (localStorage.getItem('refreshToken') !== null) {
    return <Redirect to='/profile'/>
  }

  return (
  <Form title={'Восстановление пароля'} submitHandler={submitHandler}>
    <Input placeholder={'Укажите e-mail'} value={forgotData.email || ''} name="email" onChange={changeHandler}/>
    <p>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
    <Button>Восстановить</Button>
  </Form>
  )

}

export default ForgotPassword;