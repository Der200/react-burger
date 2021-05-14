import React from 'react';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './burger-constructor.module.css';
import OrderContext from '../../contexts/order-context'

const BurgerConstructor = () => {
  const {main__block, top__ingredient, bottom__ingredient, order__container, set__box, order__footer, section, dragicon} = styles;
  const {
        setIngredientsID,
        totalPrice, 
        getOrderData, 
        setModalWindows, 
        modalWindows, 
        ingredients, 
        setTotalPrice} = React.useContext(OrderContext);

  const handleClickButton = () => {
    getOrderData();
    setModalWindows({...modalWindows, isShowOrder: true})
  }

  const priceArr = [];
  const idArr = [];

  React.useEffect(() => {
    setTotalPrice(priceArr.reduce((accumulate, currentItem) => accumulate + currentItem));
    setIngredientsID(idArr);
  }, [setTotalPrice, setIngredientsID])
  
  return (
    <section className={[main__block, set__box].join(" ")}>
      <ul className={`${top__ingredient} mt-25 pl-5`}>
        {ingredients.data.filter(ingredient => ingredient.type === 'bun' && ingredient.fat === 24).map((ingredient) => {
          priceArr.push(ingredient.price);
          idArr.push(ingredient._id);

          return (
          <li className="text text_type_main-default pb-4" key={ingredient._id}>
            <section className={section}>
            <span className="pl-6"></span>
              <ConstructorElement 
                text={ingredient.name} 
                type={'top'} 
                thumbnail={ingredient.image} 
                price={ingredient.price} 
                isLocked={true} 
              />
            </section>
          </li>
        )})}
      </ul>
      <ul className={order__container}>
        {ingredients.data.filter(ingredient => ingredient.type !== 'bun').map((ingredient) => {
          priceArr.push(ingredient.price);
          idArr.push(ingredient._id);

          return (
          <li className="text text_type_main-default pb-4" key={ingredient._id}>
            <section className={section}>
            <div className={dragicon}><DragIcon type="primary"/></div>
              <ConstructorElement 
                text={ingredient.name} 
                type={null} 
                thumbnail={ingredient.image} 
                price={ingredient.price} 
                isLocked={false} 
              />
            </section>
          </li>
        )})}
      </ul>
      <ul className={`${bottom__ingredient} pl-5`}>
        {ingredients.data.filter(ingredient => ingredient.type === 'bun' && ingredient.fat === 24).map((ingredient) => {
          priceArr.push(ingredient.price);
          idArr.push(ingredient._id);

          return (          
          <li className="text text_type_main-default pb-4" key={ingredient._id}>
            <section className={section}>
              <span className="pl-6"></span>
              <ConstructorElement 
                text={ingredient.name} 
                type={'bottom'} 
                thumbnail={ingredient.image}
                price={ingredient.price} 
                isLocked={true} 
              />
            </section>
          </li>
        )})}
      </ul>
      <section className={order__footer}>
        <span className="text text_type_digits-default">
          {totalPrice}
          <CurrencyIcon type="primary" />
        </span>
        <div onClick={handleClickButton}>
          <Button>Оформить заказ</Button>
        </div>
      </section>
    </section>
  )
}

export default BurgerConstructor;