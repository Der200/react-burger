import React from 'react';
import Form from '../components/form/form';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { forgotPassword } from '../services/redux/authorization-slice/authorization-slice';
import { useDispatch } from 'react-redux';


const ForgotPassword = () => {
  const [email, getEmail] = React.useState('')
  const dispatch = useDispatch();
  const history = useHistory();

  const changeHandler = (e) => {
    getEmail(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault();
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
  <Form title={'Восстановление пароля'} description={description()} submitHandler={submitHandler}>
    <Input placeholder={'Укажите e-mail'} value={email} name="email" onChange={changeHandler}/>
    <Button>Восстановить</Button>
  </Form>
  )

}

export default ForgotPassword;