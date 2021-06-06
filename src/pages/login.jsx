import React from 'react';
import Form from '../components/form/form';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const Login = () => {

  const description = () => {
    return (
      <>
      <p>Вы - новый пользователь? <Link to={'register'}>Зарегистрироваться</Link></p>
      <p>Забыли пароль? <Link to={'forgot-password'}>Восстановить пароль</Link></p>
      </>
    )
  };

  return (
  <Form title={'Вход'} description={description()}>
    <EmailInput value={''} />
    <PasswordInput value={''} />
    <Button>Войти</Button>

  </Form>
  )

}

export default Login;