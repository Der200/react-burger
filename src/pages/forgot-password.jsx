import React from 'react';
import Form from '../components/form/form';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/redux/authorization-slice';
import { useDispatch } from 'react-redux';


const ForgotPassword = () => {
  const [email, getEmail] = React.useState('')
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    getEmail(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({'email': email}));
  }

  const description = () => {
    return (
      <p>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
    )
  };

  return (
  <Form title={'Восстановление пароля'} description={description()}>
    <Input placeholder={'Укажите e-mail'} value={email} name="email" onChange={changeHandler}/>
    <Button onClick={submitHandler}>Восстановить</Button>
  </Form>
  )

}

export default ForgotPassword;