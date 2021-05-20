import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './burger-constructor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { showOrder } from '../../services/reducers/modal-slice';
import { orderIngredients, orderCost, placeAnOrder, orderIngredientsId, deleteIngredient } from '../../services/reducers/order-slice';
import { useDrop } from "react-dnd";

const BurgerConstructor = ({dropHandler}) => {
  const {main__block, top__ingredient, bottom__ingredient, order__container, set__box, order__footer, section, dragicon} = styles;
  const dispatch = useDispatch();
  const orderDetails = useSelector(orderIngredientsId)
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(itemId) {
      dropHandler(itemId);
    }
  });

  const totalPrice = useSelector(orderCost);
  const selectedIngredients = useSelector(orderIngredients);
  
  const handleClickButton = () => {
    if (selectedIngredients.length === 0) {
      return
    }
    dispatch(placeAnOrder(orderDetails));
    dispatch(showOrder());
  }
  
  return (
    <section className={[main__block, set__box].join(" ")}>
      <section ref={dropTarget}>
      <ul className={`${top__ingredient} mt-25 pl-5`}>
        {selectedIngredients.filter(ingredient => ingredient.type === 'bun').map((ingredient) => {
          return (
          <li className="text text_type_main-default pb-4"  key={ingredient._id}>
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
        {selectedIngredients.filter(ingredient => ingredient.type !== 'bun').map((ingredient) => {
          return (
          <li className="text text_type_main-default pb-4" key={`${ingredient._id + (Math.random() * (200 - 10) + 10)}`}>
            <section className={section}>
            <div className={dragicon}><DragIcon type="primary"/></div>
              <ConstructorElement 
                text={ingredient.name} 
                type={null} 
                thumbnail={ingredient.image} 
                price={ingredient.price} 
                isLocked={false} 
                handleClose={() => dispatch(deleteIngredient(ingredient))}
              />
            </section>
          </li>
        )})}
      </ul>
      <ul className={`${bottom__ingredient} pl-5`}>
        {selectedIngredients.filter(ingredient => ingredient.type === 'bun').map((ingredient) => {
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
      </section>
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