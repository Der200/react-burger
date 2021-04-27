import React from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';

function BurgerIngredients (props) {
  return (
    <section>
      {props.type ? <span className="pl-3"></span> : <DragIcon type="primary" />}
      <ConstructorElement text={props.name} type={props.type} thumbnail={props.image} price={props.price} isLocked={props.isLocked} />
    </section>
  )
}

BurgerIngredients.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
  isLocked: PropTypes.bool,
  price: PropTypes.number
}

export default BurgerIngredients;