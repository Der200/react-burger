import React from 'react';
import Form from '../components/form/form';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

  const description = () => {
    return (
      <p>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
    )
  };

  return (
  <Form title={'Восстановление пароля'} description={description()}>
    <Input placeholder={'Укажите e-mail'} value={''} onChange={() => {}}/>
    <Button>Восстановить</Button>
  </Form>
  )

}

export default ForgotPassword;