import {Logo, ProfileIcon, BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './app-header.module.css';

const AppHeader = () => {

  const {navlist, navlist__menu, navlist__buttonitem, active, navlist__logo, navlist__kabinet} = styles;

  return (
    <header className="pt-2 pb-2">
      <nav className="text text_type_main-default">
        <ul className={navlist}>
          <ul className={navlist__menu}>
            <li className={navlist__buttonitem}><BurgerIcon type="primary"/> 
              <span className={active}>Конструктор</span>
            </li>
            <li className={navlist__buttonitem}>
              <ListIcon type="secondary"/> 
              <span>Лента заказов</span>
            </li>
          </ul>
          <li className={navlist__logo}>
            <Logo/>
          </li>
          <li className={[navlist__buttonitem, navlist__kabinet].join(' ')}>
            <ProfileIcon type="secondary"/> 
            <span>Личный кабинет</span>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;