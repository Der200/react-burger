import React from 'react';
import Form from '../components/form/form';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/redux/authorization-slice';
import { useDispatch } from 'react-redux';

const ResetPassword = () => {
  const [resetData, getResetData] = React.useState({'password': '', 'code': ''});
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    getResetData({
      ...resetData,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(resetPassword({'password': resetData.password, 'token': resetData.code}))
  }

  const description = () => {
    return (
      <p>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
    )
  };

  return (
  <Form title={'Восстановление пароля'} description={description()}>
    <Input type={'password'} placeholder={'Введите новый пароль'} value={resetData.password} name='password' onChange={changeHandler}/>
    <Input placeholder={'Введите код из письма'} value={resetData.code} name='code' onChange={changeHandler}/>
    <Button onClick={submitHandler}>Сохранить</Button>
  </Form>
  )

}

export default ResetPassword;