import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './ingredient-details.module.css';

import Preloader from '../preloader/preloader';

import { selectedIngredient, fetchedIngredients } from '../../services/redux/ingredients-slice/ingredients-slice';

interface IIngredientDetails {
  handleClickIngredient: (target: any) => void;
  type?: string;
}

const IngredientDetails : FC<IIngredientDetails> = ({handleClickIngredient, type}) => {
  let ingredient = useSelector(selectedIngredient);
  const ingredients = useSelector(fetchedIngredients);
  const { id } = useParams();

  if (ingredient === null && ingredients !== null) {
    ingredient = ingredients.find((ingredient) => ingredient._id.toString() === id);
  }
  
  if (ingredient === null) {
    return <Preloader />
  }

  return (
      <div className={`${styles.box} ${type === 'url' ? styles.urlbox : ''}`}>
        <div className={styles.image}>
          <img src={ingredient && ingredient.image_large} alt={ingredient && ingredient.name} />
        </div>
        <h3 className="text text_type_main-medium mt-4">{ingredient && ingredient.name}</h3>
        <p className={`${styles.description} mt-8 mb-8 text text_type_main-default`}>
          Тут должно быть описание
        </p>
        <div className={`${styles.food} text text_type_main-default mb-15`}>
          <div className={`${styles.food__composition} mr-5`}>
            <span>Калории,ккал</span>
            <span className={`${styles.number} text text_type_digits-default mt-2`}>
              {ingredient && ingredient.calories}
            </span>
          </div>
          <div className={`${styles.food__composition} mr-5`}>
            <span>Белки, г</span>
            <span className={`${styles.number} text text_type_digits-default mt-2`}>
              {ingredient && ingredient.proteins}
            </span>
          </div>
          <div className={`${styles.food__composition} mr-5`}>
            <span>Жиры, г</span>
            <span className={`${styles.number} text text_type_digits-default mt-2`}>
              {ingredient && ingredient.fat}
            </span>
          </div>
          <div className={styles.food__composition}>
            <span>Углеводы, г</span>
            <span className={`${styles.number} text text_type_digits-default mt-2`}>
              {ingredient && ingredient.carbohydrates}
            </span>
          </div>
        </div>
      </div>
  )
}

export default IngredientDetails;