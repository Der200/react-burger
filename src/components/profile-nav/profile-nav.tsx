import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './profile-nav.module.css';

import { logout } from '../../services/redux/authorization-slice/authorization-slice';


interface IProfileNav {
  description: string;
}

const ProfileNav : FC<IProfileNav> = ({description}) => {
  const dispatch = useDispatch();
  
  const token = localStorage.getItem('refreshToken');
  
  const submitHandler = (e) => {
    e.preventDefault();
    // @ts-ignore: Unreachable code error
    dispatch(logout({token})); 
  }

  return (
    <section className={styles.container}>
      <NavLink exact to='/profile' className={styles.nav__item} activeClassName={styles.active}><span>Профиль</span></NavLink>
      <NavLink exact to='/profile/orders' className={styles.nav__item} activeClassName={styles.active}><span>История заказов</span></NavLink>
      <NavLink exact to='/login' className={styles.nav__item} activeClassName={styles.active} onClick={submitHandler}><span>Выход</span></NavLink>
      {description && <p className={styles.description}>{description}</p>}
    </section>
  )
}

export default ProfileNav;