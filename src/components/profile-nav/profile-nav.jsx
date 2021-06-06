import { NavLink } from 'react-router-dom';
import styles from './profile-nav.module.css'

const ProfileNav = ({description}) => {

  return (
    <>
      <section className={styles.container}>
        <NavLink to='/profile' className={styles.nav__item} activeClassName={styles.active}><span>Профиль</span></NavLink>
        <NavLink to='/feed' className={styles.nav__item} activeClassName={styles.active}><span>История заказов</span></NavLink>
        <NavLink exact to='/' className={styles.nav__item} activeClassName={styles.active}><span>Выход</span></NavLink>
      </section>
      {description && <p className={styles.description}>{description}</p>}
    </>
  )
}

export default ProfileNav;