import { useEffect, useState, FC, MouseEventHandler } from 'react';
import { useHistory } from 'react-router-dom';
import { useDrag } from "react-dnd";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";

import styles from './ingredient.module.css';

import { orderIngredients } from '../../services/redux/order-slice/order-slice';

import TIngredientObject from '../../utils/types';
import { useAppSelector } from '../../utils/common';

interface IIngredient {
  ingredient: TIngredientObject;
  handleClickIngredient: (ingredient: TIngredientObject) => void;
  testIndex: string;
}

const Ingredient : FC<IIngredient> = ({ingredient, handleClickIngredient, testIndex}) => {
  const {image, price, name, _id} = ingredient;
  const selectedIngredients = useAppSelector(orderIngredients);
  const [count, setCount] = useState<number>(0);

  const history = useHistory();

  useEffect(() => {
    setCount(
      selectedIngredients.filter(orderIngredient => orderIngredient._id === ingredient._id).length
    )
  }, [selectedIngredients, ingredient])

  const [, drag] = useDrag({
    type: 'ingredient',
    item: {_id}
  });

  const handleClick: MouseEventHandler = (): void => {
    handleClickIngredient(ingredient)
    history.push('/')
    history.replace(`/ingredient/${_id}`)
    
  }

  return (
    <section className={styles.section} onClick={handleClick} ref={drag} data-cy={testIndex}>
      {count > 0 && <Counter count={count}/>}
      <img src={image} alt={name}/>
      <div className='mt-1 mb-1'>
        <span className="text text_type_digits-default">
          {price} <CurrencyIcon type="primary" />
        </span>
      </div>
      <div className="text text_type_main-default">{name}</div>
    </section>
  )
}

export default Ingredient;