import React from 'react';
import Form from '../components/form/form';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { user, changeUserData, register } from '../services/redux/authorization-slice';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
  const currentUser = useSelector(user);
  const {email, password, name} = currentUser;
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    dispatch(changeUserData({
      name: e.target.name, 
      value: e.target.value
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(register({'email': email, 'password': password, 'name': name}))
  }

  const description = () => {
    return (
      <p>Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
    )
  };

  return (
  <Form title={'Регистрация'} description={description()}>
    <Input placeholder={'Имя'} value={currentUser.name} name='name' onChange={changeHandler}/>
    <Input type={'email'} placeholder={'Email'} value={currentUser.email} name='email' onChange={changeHandler}/>
    <PasswordInput value={currentUser.password} onChange={changeHandler}  name='password'/>
    <Button onClick={submitHandler}>Зарегистрироваться</Button>
  </Form>
  )

}

export default Register;