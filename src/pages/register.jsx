import React from 'react';
import Form from '../components/form/form';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { register } from '../services/redux/authorization-slice/authorization-slice';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Register = () => {
  const [registerData, getRegisterData] = React.useState({});
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    getRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(register({'email': registerData.email, 'password': registerData.password, 'name': registerData.name}))
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
  <Form title={'Регистрация'} description={description()} submitHandler={submitHandler}>
    <Input placeholder={'Имя'} value={registerData.name || ''} name='name' onChange={changeHandler}/>
    <Input type={'email'} placeholder={'Email'} value={registerData.email || ''} name='email' onChange={changeHandler}/>
    <PasswordInput value={registerData.password || ''} onChange={changeHandler}  name='password'/>
    <Button>Зарегистрироваться</Button>
  </Form>
  )

}

export default Register;