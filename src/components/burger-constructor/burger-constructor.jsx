import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './burger-constructor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { showOrder } from '../../services/redux/modal-slice';
import { orderIngredients, orderCost, placeAnOrder, orderIngredientsId, deleteIngredient } from '../../services/redux/order-slice';
import { useDrop } from "react-dnd";
import OrderItem from '../order-item/order-item'

const BurgerConstructor = ({dropHandler}) => {
  const {main__block, top__ingredient, bottom__ingredient, order__container, set__box, order__footer} = styles;

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
          return <OrderItem ingredient={ingredient} position={'top'} isLocked={true} key={ingredient._id}/>
      })}
      </ul>
      <ul className={order__container}>
        {selectedIngredients.filter(ingredient => ingredient.type !== 'bun').map((ingredient, index) => {
          return (<OrderItem 
                  index={index}
                  ingredient={ingredient} 
                  position={null} 
                  isLocked={false}
                  handleClose={() => dispatch(deleteIngredient(ingredient))}
                  key={ingredient._id + (Math.random() * (200 - 10) + 10)}
                  />);
        })}
      </ul>
      <ul className={`${bottom__ingredient} pl-5`}>
        {selectedIngredients.filter(ingredient => ingredient.type === 'bun').map((ingredient) => {
          return <OrderItem ingredient={ingredient} position={'bottom'} isLocked={true} key={ingredient._id}/>
        })}
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