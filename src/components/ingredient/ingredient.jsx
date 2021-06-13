import React, { useEffect, useState } from 'react';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './ingredient.module.css';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';
import { orderIngredients } from '../../services/redux/order-slice';
import { useHistory } from 'react-router-dom';

const Ingredient = ({ingredient, handleClickIngredient}) => {
  const {image, price, name, _id} = ingredient;
  const selectedIngredients = useSelector(orderIngredients);
  const [count, setCount] = useState(0);
  const history = useHistory();

  useEffect(() => {
    setCount(
      selectedIngredients.filter(orderIngredient => orderIngredient === ingredient).length
    )
  }, [selectedIngredients, ingredient])

  const [, drag] = useDrag({
    type: 'ingredient',
    item: {_id}
  });

  const handleClick = () => {
    handleClickIngredient(ingredient)
    history.replace(`/ingredient/${_id}`)
    
  }

  return (
    <section className={styles.section} onClick={handleClick} ref={drag}>
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
  ingredient: PropTypes.shape({
    image_large: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired, 
    calories: PropTypes.number.isRequired, 
    proteins: PropTypes.number.isRequired, 
    fat: PropTypes.number.isRequired, 
    carbohydrates: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }),  
}

export default Ingredient;