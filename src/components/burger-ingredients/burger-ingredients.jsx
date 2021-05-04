import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = ({name, type, image, price, isLocked}) => {
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

BurgerIngredients.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
  isLocked: PropTypes.bool,
  price: PropTypes.number
}

export default BurgerIngredients;