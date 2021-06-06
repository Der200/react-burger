import React from 'react';
import Form from '../components/form/form';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const ResetPassword = () => {

  const description = () => {
    return (
      <p>Вспомнили пароль? <Link to='login'>Войти</Link></p>
    )
  };

  return (
  <Form title={'Восстановление пароля'} description={description()}>
    <Input type={'password'} placeholder={'Введите новый пароль'} value={''} icon={'PasswordIcon'} />
    <Input placeholder={'Введите код из письма'} value={''} />
    <Button>Сохранить</Button>

  </Form>
  )

}

export default ResetPassword;