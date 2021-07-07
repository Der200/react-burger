import React, { FC, FormEventHandler, ChangeEventHandler } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import Form from '../components/form/form';

import { resetPassword, recoveryCodeStatus } from '../services/redux/authorization-slice/authorization-slice';

import { TAuthorizationForm } from '../utils/types';

const ResetPassword : FC = () => {
  const [resetData, getResetData] = React.useState<TAuthorizationForm>({'password': '', 'code': ''});
  const recoveryStatus = useSelector(recoveryCodeStatus);
  const dispatch = useDispatch();
  const history = useHistory();

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e): void => {
    getResetData({
      ...resetData,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler: FormEventHandler = (e): void => {
    e.preventDefault()
    // @ts-ignore
    dispatch(resetPassword({'password': resetData.password, 'token': resetData.code}))
    history.replace({pathname: '/login'});
  }

  if (localStorage.getItem('refreshToken') !== null) {
    return <Redirect to='/profile'/>
  }

  if (!recoveryStatus) {
    return <Redirect to='/forgot-password'/>
  }

  return (
  <Form title={'Восстановление пароля'} submitHandler={submitHandler}>
    <Input type={'password'} placeholder={'Введите новый пароль'} value={resetData.password || ''} name='password' onChange={changeHandler}/>
    <Input placeholder={'Введите код из письма'} value={resetData.code || ''} name='code' onChange={changeHandler}/>
    <p>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
    <Button>Сохранить</Button>
  </Form>
  )

}

export default ResetPassword;