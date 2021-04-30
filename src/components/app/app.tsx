import React from 'react';
import { Tab, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app.module.css';
import AppHeader from '../app-header/app-header'; 
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import mockData from '../../utils/data';

function App() {
  const [current, setCurrent] = React.useState('bun');
  const {main__content, main__tabs, main__block, main__ingredients, ingredients__container, ingredients__header, order__container, order__footer} = styles;

  return (
    <>
    <AppHeader />
    <main className={main__content}>
      <section className={main__block}>
        <section className={ingredients__header}>
          <h1 className="text text_type_main-large">Соберите бургер</h1>
          <div className={main__tabs}>
            <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
            <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
          </div>
        </section>
        <section className={ingredients__container}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <div className={main__ingredients}>
            {mockData.filter(ingredient => ingredient.type === 'bun').map((ingredient) => (
                <BurgerConstructor key={ingredient._id} {...ingredient}/>
            ))}
          </div>

          <h2 className="text text_type_main-medium pt-4">Соусы</h2>
          <div className={main__ingredients}>
            {mockData.filter(ingredient => ingredient.type === 'sauce').map((ingredient) => (
                <BurgerConstructor key={ingredient._id} {...ingredient}/>
            ))}
          </div>

          <h2 className="text text_type_main-medium pt-4">Начинки</h2>
          <div className={main__ingredients}>
            {mockData.filter(ingredient => ingredient.type === 'main').map((ingredient) => (
                <BurgerConstructor key={ingredient._id} {...ingredient}/>
            ))}
          </div>
        </section>
      </section>
      <section className={main__block}>
        <ul className={order__container}>
          {mockData.map((ingredient, index) => (
            <li className="text text_type_main-default pb-2" key={ingredient._id + index}>
              <BurgerIngredients {...ingredient} type={index === 0 ? 'top' : (index === mockData.length -1 ? 'bottom' : null)} isLocked={index === 0 || index === mockData.length -1} />
            </li>
          ))}
        </ul>
        <section className={order__footer}>
          <span className="text text_type_digits-default">
            {mockData.reduce((total, ingredient) => (total + ingredient.price), 0)}
            <CurrencyIcon type="primary" />
          </span>
          <Button>Оформить заказ</Button>
        </section>
      </section>
    </main>
    </>
  );
}

export default App;
