import React from 'react';
import {Logo, ProfileIcon, BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './app-header.module.css'

function AppHeader () {

  const {navlist, navlist__menu, navlist__buttonitem, active, navlist__logo, navlist__kabinet} = styles;

  return (
    <header className="pt-2 pb-2">
      <nav className="text text_type_main-default">
        <ul className={navlist}>
          <ul className={navlist__menu}>
            <li className={navlist__buttonitem}><BurgerIcon type="primary"/> <a className={active}>Конструктор</a></li>
            <li className={navlist__buttonitem}><ListIcon type="secondary"/> <a>Лента заказов</a></li>
          </ul>
          <li className={navlist__logo}><Logo/></li>
          <li className={[navlist__buttonitem, navlist__kabinet].join(' ')}><ProfileIcon type="secondary"/> <a>Личный кабинет</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;