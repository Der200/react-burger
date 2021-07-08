import React, { FC, ChangeEventHandler, FormEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { Redirect,useHistory } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import Form from '../components/form/form';

import { register } from '../services/redux/authorization-slice/authorization-slice';

import { TAuthorizationForm } from '../utils/types';
import { useAppDispatch } from '../utils/common';

const Register : FC = () => {
  const [registerData, getRegisterData] = React.useState<TAuthorizationForm>({});
  const dispatch = useAppDispatch();
  const history = useHistory();

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e): void => {
    getRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler: FormEventHandler = (e): void => {
    e.preventDefault()
    // @ts-ignore
    dispatch(register({'email': registerData.email, 'password': registerData.password, 'name': registerData.name}))
    history.replace({ pathname: '/' })
  }

  if (localStorage.getItem('refreshToken') !== null) {
    return <Redirect to='/profile'/>
  }

  return (
  <Form title={'Регистрация'} submitHandler={submitHandler}>
    <Input placeholder={'Имя'} value={registerData.name || ''} name='name' onChange={changeHandler}/>
    <Input type={'email'} placeholder={'Email'} value={registerData.email || ''} name='email' onChange={changeHandler}/>
    <PasswordInput value={registerData.password || ''} onChange={changeHandler}  name='password'/>
    <p>Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
    <Button>Зарегистрироваться</Button>
  </Form>
  )

}

export default Register;