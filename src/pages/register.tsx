import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Redirect,useHistory } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import Form from '../components/form/form';

import { register } from '../services/redux/authorization-slice/authorization-slice';

import { TAuthorizationForm } from '../utils/types';

const Register : FC = () => {
  const [registerData, getRegisterData] = React.useState<TAuthorizationForm>({});
  const dispatch = useDispatch();
  const history = useHistory();

  const changeHandler = (e) => {
    getRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    // @ts-ignore
    dispatch(register({'email': registerData.email, 'password': registerData.password, 'name': registerData.name}))
    history.replace({ pathname: '/' })
  }

  const description = () => {
    return (
      <p>Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
    )
  };

  if (localStorage.getItem('refreshToken') !== null) {
    return <Redirect to='/profile'/>
  }

  return (
    // @ts-ignore
  <Form title={'Регистрация'} description={description()} submitHandler={submitHandler}>
    <Input placeholder={'Имя'} value={registerData.name || ''} name='name' onChange={changeHandler}/>
    <Input type={'email'} placeholder={'Email'} value={registerData.email || ''} name='email' onChange={changeHandler}/>
    <PasswordInput value={registerData.password || ''} onChange={changeHandler}  name='password'/>
    <Button>Зарегистрироваться</Button>
  </Form>
  )

}

export default Register;