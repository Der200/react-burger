import React, { useState } from 'react';
import Form from '../components/form/form';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { login } from '../services/redux/authorization-slice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [loginData, getLoginData] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    getLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({'email': loginData.email, 'password': loginData.password}));
    history.replace({ pathname: '/' });
  }  

  const description = () => {
    return (
      <>
      <p>Вы - новый пользователь? <Link to={'/register'}>Зарегистрироваться</Link></p>
      <p>Забыли пароль? <Link to={'/forgot-password'}>Восстановить пароль</Link></p>
      </>
    )
  };

  if (localStorage.getItem('refreshToken') !== null) {
    return <Redirect to='/profile'/>
  }

  return (
  <Form title={'Вход'} description={description()} submitHandler={submitHandler}>
    <EmailInput value={loginData.email || ''} name='email' onChange={changeHandler}/>
    <PasswordInput value={loginData.password || ''} name='password' onChange={changeHandler}/>
    <Button>Войти</Button>
  </Form>
  )

}

export default Login;