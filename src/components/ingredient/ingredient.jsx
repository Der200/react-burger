import React, { useEffect, useState } from 'react';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './ingredient.module.css';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';
import { orderIngredients } from '../../services/reducers/order-slice';

const Ingredient = ({ingredient, handleClickIngredient}) => {
  const {image, price, name, _id} = ingredient;
  const selectedIngredients = useSelector(orderIngredients);
  const [count, setCount] = useState(0);


  useEffect(() => {
    setCount(
      selectedIngredients.filter(orderIngredient => orderIngredient === ingredient).length
    )
  }, [selectedIngredients])

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {_id}
  });

  const handleClick = () => {
    handleClickIngredient(ingredient)
  }

  return (
    <section className={styles.section} onClick={handleClick} ref={dragRef}>
      {count > 0 && <Counter count={count}/>}
      <img src={image} alt=""/>
      <div className='mt-1 mb-1'>
        <span className="text text_type_digits-default">
          {price} <CurrencyIcon type="primary" />
        </span>
      </div>
      <div className="text text_type_main-default">{name}</div>
    </section>
  )
}

Ingredient.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number
}

export default Ingredient;