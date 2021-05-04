import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

const IngredientDetails = ({ ingredient, handleClickIngredient }) => {
  const { image_large, name, calories, proteins, fat, carbohydrates } = ingredient;
  
  const handleClick = (target) => {
    handleClickIngredient && handleClickIngredient(target)
  }

  return (
    <Modal title='Детали ингредиента' handleClickModal = {handleClick}>
      <div className={styles.box}>
        <div className={styles.image}>
          <img src={image_large} alt={name} />
        </div>
        <h3 className={`${styles.name} text text_type_main-medium`}>{name}</h3>
        <p className={`${styles.description} mt-8 mb-8 text text_type_main-default`}>
          Тут должно быть описание
        </p>
        <div className={`${styles.food} text text_type_main-default mb-15`}>
          <div className="mr-5">
            <span>Калории,ккал</span>
            <span className={`${styles.number} text text_type_digits-default mt-2`}>
              {calories}
            </span>
          </div>
          <div className="mr-5">
            <span>Белки, г</span>
            <span className={`${styles.number} text text_type_digits-default mt-2`}>
              {proteins}
            </span>
          </div>
          <div className="mr-5">
            <span>Жиры, г</span>
            <span className={`${styles.number} text text_type_digits-default mt-2`}>
              {fat}
            </span>
          </div>
          <div>
            <span>Углеводы, г</span>
            <span className={`${styles.number} text text_type_digits-default mt-2`}>
              {carbohydrates}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  )
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.object.isRequired,
  handleClickIngredient :PropTypes.func.isRequired
}

export default IngredientDetails;