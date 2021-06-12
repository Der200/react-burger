import React from 'react';
import Form from '../components/form/form';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { login, user } from '../services/redux/authorization-slice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [loginData, getLoginData] = React.useState({})

  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(user);

  const changeHandler = (e) => {
    getLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({'email': loginData.email, 'password': loginData.password}));
    history.replace({ pathname: '/' })
  }  

  const description = () => {
    return (
      <>
      <p>Вы - новый пользователь? <Link to={'/register'}>Зарегистрироваться</Link></p>
      <p>Забыли пароль? <Link to={'/forgot-password'}>Восстановить пароль</Link></p>
      </>
    )
  };

  if (currentUser !== null) {
    return <Redirect to='/'/>
  }

  return (
  <Form title={'Вход'} description={description()}>
    <EmailInput value={loginData.email || ''} name='email' onChange={changeHandler}/>
    <PasswordInput value={loginData.password || ''} name='password' onChange={changeHandler}/>
    <Button onClick={submitHandler}>Войти</Button>
  </Form>
  )

}

export default Login;