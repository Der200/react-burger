import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components/dist/index.js';
import styles from './order-item.module.css';
import { sortingIngredients } from '../../services/redux/order-slice';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop} from 'react-dnd';
import { useRef } from 'react';
import PropTypes from 'prop-types';

const OrderItem = ({ingredient, position, index, isLocked, handleClose}) => {
  const dispatch = useDispatch();
  
  const handleDrop =(item, monitor) => {
    if(item.ingredient.type === 'bun') return
    if(item.index !== index) {
      dispatch(sortingIngredients({indexFrom: item.index, indexTo: index}))
    }
  }

  const ref = useRef();

  const [, drag] = useDrag({
    type: 'orderElement',
    item: {index, ingredient},
  });

  const [, drop] = useDrop({
    accept: 'orderElement',
    drop(item, monitor) {
      handleDrop(item, monitor)
    },
  });

  return (
    <li className="text text_type_main-default pb-4" ref={drag(drop(ref))}>
      <section className={styles.section}>
      {ingredient.type === 'bun' ? <span className="pl-6"></span> : <div className={styles.dragicon}><DragIcon type="primary"/></div>}
        <ConstructorElement 
          text={ingredient.name} 
          type={position} 
          thumbnail={ingredient.image} 
          price={ingredient.price} 
          isLocked={isLocked} 
          handleClose={handleClose}
        />
      </section>
    </li> 
  )
}

OrderItem.propTypes = {
  ingredient: PropTypes.object,
  position: PropTypes.string,
  index: PropTypes.number,
  isLocked: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
}

export default OrderItem;