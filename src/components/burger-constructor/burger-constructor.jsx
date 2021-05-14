import React from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import OrderContext from '../../contexts/order-context'

const BurgerConstructor = ({name, type, image, price, _id, isLocked}) => {
  const {dispatcherTotalPrice, dispatcherIngredientIds} = React.useContext(OrderContext);

  React.useEffect(() => {
    dispatcherTotalPrice({data: price});
    dispatcherIngredientIds({id: _id})
  }, [dispatcherTotalPrice, dispatcherIngredientIds, price, _id])
  
  return (
    <section className={styles.section}>
      {type ? <span className="pl-6"></span> : <div className={styles.dragicon}><DragIcon type="primary"/></div>}
      <ConstructorElement 
        text={name} 
        type={type} 
        thumbnail={image} 
        price={price} 
        isLocked={isLocked} 
      />
    </section>
  )
}

BurgerConstructor.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
  isLocked: PropTypes.bool,
  price: PropTypes.number
}

export default BurgerConstructor;