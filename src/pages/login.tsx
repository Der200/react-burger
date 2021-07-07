import React, { useState, FC, ChangeEventHandler, FormEventHandler } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import Form from '../components/form/form';

import { login, userStatus } from '../services/redux/authorization-slice/authorization-slice';

import { TAuthorizationForm } from '../utils/types';

const Login : FC = () => {
  const [loginData, getLoginData] = useState<TAuthorizationForm>({});

  const history = useHistory();
  const dispatch = useDispatch();
  
  const forwardLink = history.location.state ? history.location.state.forward.pathname : '';
  const hasToken = localStorage.getItem('refreshToken');
  const status = useSelector(userStatus);

  React.useEffect(() => {
    if (status === 'succeeded' && hasToken) {
      history.replace(forwardLink);
    }
  }, [status])

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e): void => {
    getLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler: FormEventHandler = (e): void => {
    e.preventDefault();
    // @ts-ignore
    dispatch(login({'email': loginData.email, 'password': loginData.password}));
    
  }  

  if (localStorage.getItem('refreshToken') !== null) {
    return <Redirect to='/profile'/>
  }

  return (
  <Form title={'Вход'} submitHandler={submitHandler}>
    <EmailInput value={loginData.email || ''} name='email' onChange={changeHandler}/>
    <PasswordInput value={loginData.password || ''} name='password' onChange={changeHandler}/>
    <p>Вы - новый пользователь? <Link to={'/register'}>Зарегистрироваться</Link></p>
    <p>Забыли пароль? <Link to={'/forgot-password'}>Восстановить пароль</Link></p>
    <Button>Войти</Button>
  </Form>
  )

}

export default Login;