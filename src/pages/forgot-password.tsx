import React, { FC } from 'react';
import Form from '../components/form/form';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { forgotPassword } from '../services/redux/authorization-slice/authorization-slice';
import { useDispatch } from 'react-redux';
import { TAuthorizationForm } from '../utils/types';


const ForgotPassword : FC = () => {
  const [forgotData, getForgotData] = React.useState<TAuthorizationForm>({'email': ''});
  const dispatch = useDispatch();
  const history = useHistory();

  const changeHandler = (e) => {
    getForgotData({...forgotData, [e.target.name]: e.target.value})
  }

  const submitHandler = (e) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(forgotPassword({'email': email}));
    history.replace({ pathname: '/reset-password' })
  }

  const description = () => {
    return (
      <p>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
    )
  };

  if (localStorage.getItem('refreshToken') !== null) {
    return <Redirect to='/profile'/>
  }

  return (
    // @ts-ignore
  <Form title={'Восстановление пароля'} description={description()} submitHandler={submitHandler}>
    <Input placeholder={'Укажите e-mail'} value={forgotData.email || ''} name="email" onChange={changeHandler}/>
    <Button>Восстановить</Button>
  </Form>
  )

}

export default ForgotPassword;