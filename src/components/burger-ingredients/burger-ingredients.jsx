import { useState, useContext } from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './burger-ingredients.module.css';
import IngredientContext from '../../contexts/ingredient-context';
import IngredientsContext from '../../contexts/ingredients-context';
import Ingredient from '../ingredient/ingredient'

const BurgerIngredients = () => {
  const {main__tabs, 
        main__block, 
        main__ingredients,
        ingredients__container, 
        assembly__box
  } = styles;

  const {ingredients, setItemIngredient, setModalWindows, modalWindows} = useContext(IngredientsContext);
  const [currentTab, setCurrentTab] = useState('bun');

  const handleClickIngredient = ingredient => {
    setItemIngredient(ingredient)
    setModalWindows({...modalWindows, isShowIngredient: true})
  }

  return (
    <section className={main__block}>
      <section className="mt-10">
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <div className={[main__tabs, 'tabs'].join(' ')}>
          <Tab value="bun" active={currentTab === 'bun'} onClick={setCurrentTab}>Булки</Tab>
          <Tab value="sauce" active={currentTab === 'sauce'} onClick={setCurrentTab}>Соусы</Tab>
          <Tab value="main" active={currentTab === 'main'} onClick={setCurrentTab}>Начинки</Tab>
        </div>
      </section>
      <section className={[ingredients__container, assembly__box].join(" ")}>
        <h2 className="text text_type_main-medium mb-6 bun">Булки</h2>
        <div className={main__ingredients}>
          {ingredients.data.filter(ingredient => ingredient.type === 'bun').map((ingredient) => (
            <IngredientContext.Provider value={{ingredient, handleClickIngredient}} key={ingredient._id + 'k'}>
              <Ingredient
                key={ingredient._id}
                
              />
            </IngredientContext.Provider>
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6 sauce">Соусы</h2>
        <div className={main__ingredients}>
          {ingredients.data.filter(ingredient => ingredient.type === 'sauce').map((ingredient) => (
            <IngredientContext.Provider value={{ingredient, handleClickIngredient}} key={ingredient._id + 'k'}>
              <Ingredient
                key={ingredient._id}
              />
            </IngredientContext.Provider>
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6 main">Начинки</h2>
        <div className={main__ingredients}>
          {ingredients.data.filter(ingredient => ingredient.type === 'main').map((ingredient) => (
            <IngredientContext.Provider value={{ingredient, handleClickIngredient}} key={ingredient._id + 'k'}>
              <Ingredient
                key={ingredient._id}
              />
            </IngredientContext.Provider>
          ))}
        </div>
      </section>
    </section>
  )
}

export default BurgerIngredients;