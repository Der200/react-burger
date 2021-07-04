import { FC } from "react";
import {Logo, ProfileIcon, BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './app-header.module.css';
import { NavLink } from 'react-router-dom';


const AppHeader : FC = () => {

  const {navlist, navlist__menu, navlist__buttonitem, nav__item, navlist__logo, navlist__kabinet, active__item} = styles;

  return (
    <header className="pt-2 pb-2">
      <nav className="text text_type_main-default">
        <ul className={navlist}>
          <ul className={navlist__menu}>
            <li className={navlist__buttonitem}>
              <NavLink exact to={'/'} className={nav__item} activeClassName={active__item}>
                <BurgerIcon type="secondary"/>
                <span>Конструктор</span>
              </NavLink>
            </li>
            <li className={navlist__buttonitem}>
              <NavLink to={'/feed'} className={nav__item} activeClassName={active__item}>
                <ListIcon type="secondary"/> 
                <span>Лента заказов</span>
              </NavLink>
            </li>
          </ul>
          <li className={navlist__logo}>
            <Logo/>
          </li>
          <li className={[navlist__buttonitem, navlist__kabinet].join(' ')}>
            <NavLink to={'/profile'} className={nav__item} activeClassName={active__item}>
              <ProfileIcon type="secondary"/> 
              <span>Личный кабинет</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;