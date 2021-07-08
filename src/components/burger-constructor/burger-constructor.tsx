import { FC, MouseEventHandler } from "react";
import { useDrop } from 'react-dnd';
import { useHistory } from 'react-router-dom';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";

import styles from './burger-constructor.module.css';

import OrderItem from '../order-item/order-item';
import Preloader from "../preloader/preloader";

import { orderIngredients, 
         orderCost, 
         placeAnOrder, 
         orderIngredientsId, 
         deleteIngredient, 
         showOrder, 
         mainIngredients, 
         orderFetchStatus} from '../../services/redux/order-slice/order-slice';
import { useAppDispatch, useAppSelector } from "../../utils/common";


interface IBurgerConstructor {
  dropHandler: (itemId: unknown) => void;
}

const BurgerConstructor : FC<IBurgerConstructor> = ({dropHandler}) => {
  const {main__block, top__ingredient, bottom__ingredient, order__container, set__box, order__footer} = styles;

  const orderStatus = useAppSelector(orderFetchStatus);

  const history = useHistory();
  const dispatch = useAppDispatch();
  const orderDetails = useAppSelector(orderIngredientsId);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(itemId) {
      dropHandler(itemId);
    }
  });

  const totalPrice = useAppSelector(orderCost);
  const selectedIngredients = useAppSelector(orderIngredients);
  const selectedMainIngredients = useAppSelector(mainIngredients);
  
  const handleClickButton: MouseEventHandler = (): void => {
    if (selectedIngredients.length === 0) {
      return
    }
    if (localStorage.getItem('refreshToken') === null) {
      history.replace({ pathname: '/login' });
    } else {
      dispatch(placeAnOrder(orderDetails));
      dispatch(showOrder());
    }
  }

  if (orderStatus === 'loading') {
    return (
      <Preloader />
    )
  }
  
  return (
    <section className={[main__block, set__box].join(" ")}>
      <section ref={dropTarget} data-cy="dropTarget">
      <ul className={`${top__ingredient} mt-25 pl-5`}>
        {selectedIngredients.filter(ingredient => ingredient.type === 'bun').map((ingredient, index) => {
          return <OrderItem ingredient={ingredient} index={index} position={'top'} isLocked={true} key={ingredient._id}/>
      })}
      </ul>
      <ul className={order__container}>
        {selectedMainIngredients.filter(ingredient => ingredient.type !== 'bun').map((ingredient, index) => {
          return (<OrderItem 
                  index={index}
                  ingredient={ingredient} 
                  position={undefined} 
                  isLocked={false}
                  handleClose={() => dispatch(deleteIngredient(ingredient))}
                  key={ingredient.key}
                  />);
        })}
      </ul>
      <ul className={`${bottom__ingredient} pl-5`}>
        {selectedIngredients.filter(ingredient => ingredient.type === 'bun').map((ingredient, index) => {
          return <OrderItem ingredient={ingredient} index={index} position={'bottom'} isLocked={true} key={ingredient._id}/>
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