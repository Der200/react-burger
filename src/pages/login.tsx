import React, { useState, FC } from 'react';
import Form from '../components/form/form';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { login, userStatus } from '../services/redux/authorization-slice/authorization-slice';
import { useDispatch, useSelector } from 'react-redux';
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

  const changeHandler = (e) => {
    getLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(login({'email': loginData.email, 'password': loginData.password}));
    
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
    // @ts-ignore
  <Form title={'Вход'} description={description()} submitHandler={submitHandler}>
    <EmailInput value={loginData.email || ''} name='email' onChange={changeHandler}/>
    <PasswordInput value={loginData.password || ''} name='password' onChange={changeHandler}/>
    <Button>Войти</Button>
  </Form>
  )

}

export default Login;