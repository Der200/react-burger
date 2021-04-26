import React from 'react';
import {Logo, ProfileIcon, BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './app-header.module.css'

function AppHeader () {

  return (
    <header className="pt-2 pb-2">
      <nav className="text text_type_main-default">
        <ul className={styles.navlist}>
          <ul className={styles.navlist__menu}>
            <li className={styles.navlist__buttonitem}><BurgerIcon /> <a className={styles.active}>Конструктор</a></li>
            <li className={styles.navlist__buttonitem}><ListIcon type="secondary"/> <a>Лента заказов</a></li>
          </ul>
          <li className={styles.navlist__logo}><Logo/></li>
          <li className={styles.navlist__buttonitem, styles.navlist__kabinet}><ProfileIcon className={styles.nav__images} type="secondary"/> <a>Личный кабинет</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;