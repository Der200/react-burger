import { NavLink } from 'react-router-dom';
import styles from './profile-nav.module.css';
import { refreshToken, logout } from '../../services/redux/authorization-slice';
import { useDispatch, useSelector } from 'react-redux';

const ProfileNav = ({description}) => {
  const dispatch = useDispatch();
  const token = useSelector(refreshToken);
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(logout({token}));
  }

  return (
    <section className={styles.container}>
      <NavLink exact to='/profile' className={styles.nav__item} activeClassName={styles.active}><span>Профиль</span></NavLink>
      <NavLink exact to='/profile/orders' className={styles.nav__item} activeClassName={styles.active}><span>История заказов</span></NavLink>
      <NavLink exact to='/' className={styles.nav__item} activeClassName={styles.active} onClick={submitHandler}><span>Выход</span></NavLink>
      {description && <p className={styles.description}>{description}</p>}
    </section>
  )
}

export default ProfileNav;