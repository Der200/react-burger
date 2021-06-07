import React from 'react';
import Form from '../components/form/form';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { resetPassword, changeResetTemplate, resetTemplate } from '../services/redux/authorization-slice';
import { useDispatch, useSelector } from 'react-redux';

const ResetPassword = () => {
  const templateResetData = useSelector(resetTemplate);
  const dispatch = useDispatch();
  const {password, code} = templateResetData;

  const changeHandler = (e) => {
    dispatch(changeResetTemplate({
      name: e.target.name, 
      value: e.target.value
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(resetPassword({'password': password, 'token': code}))
  }

  const description = () => {
    return (
      <p>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
    )
  };

  return (
  <Form title={'Восстановление пароля'} description={description()}>
    <Input type={'password'} placeholder={'Введите новый пароль'} value={templateResetData.password} name='password' onChange={changeHandler}/>
    <Input placeholder={'Введите код из письма'} value={templateResetData.code} name='code' onChange={changeHandler}/>
    <Button onClick={submitHandler}>Сохранить</Button>
  </Form>
  )

}

export default ResetPassword;