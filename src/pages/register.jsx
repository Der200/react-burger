import React from 'react';
import Form from '../components/form/form';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const Register = () => {

  const description = () => {
    return (
      <p>Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
    )
  };

  return (
  <Form title={'Регистрация'} description={description()}>
    <Input placeholder={'Имя'} value={''} onChange={() => {}}/>
    <Input type={'email'} placeholder={'Email'} value={''} onChange={() => {}}/>
    <PasswordInput value={''} onChange={() => {}}/>
    <Button>Зарегистрироваться</Button>
  </Form>
  )

}

export default Register;