import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';

function BurgerConstructor(props) {
  return (
    <section className={styles.section}>
      <img src={props.image} alt=""/>
      <div>
        <span className="text text_type_digits-default">
          {props.price} <CurrencyIcon type="primary" />
        </span>
      </div>
      <div className="text text_type_main-default">{props.name}</div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number
}

export default BurgerConstructor;