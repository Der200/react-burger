import { FC, MouseEventHandler } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './profile-nav.module.css';

import { logout } from '../../services/redux/authorization-slice/authorization-slice';
import { useAppDispatch } from '../../utils/common';


interface IProfileNav {
  description: string;
}

const ProfileNav : FC<IProfileNav> = ({description}) => {
  const dispatch = useAppDispatch();
  
  const token: string | null = localStorage.getItem('refreshToken');
  
  const submitHandler: MouseEventHandler = (e): void => {
    e.preventDefault();
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