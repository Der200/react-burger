import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import IngredientContext from '../../contexts/ingredient-context'

const BurgerIngredients = ({handleClickIngredient}) => {
  const ingredient = React.useContext(IngredientContext);
  //console.log(ingredient)
  const {image, price, name} = ingredient;

  const handleClick = () => {
    handleClickIngredient && handleClickIngredient(ingredient)
  }

  return (
    <section className={styles.section} onClick={handleClick}>
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

BurgerIngredients.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number
}

export default BurgerIngredients;