import { useRef, useState, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";

import styles from './burger-ingredients.module.css';

import Ingredient from '../ingredient/ingredient';

import { fetchedIngredients, setIngredientDetails, showIngredientDetails } from '../../services/redux/ingredients-slice/ingredients-slice';

import TIngredientObject from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../utils/common';


const BurgerIngredients : FC = () => {
  const ingredients: TIngredientObject[] = useAppSelector(fetchedIngredients);
  const {main__tabs, 
        main__block, 
        main__ingredients,
        ingredients__container, 
        assembly__box
  } = styles;

  const dispatch = useAppDispatch();
  const [currentTab, setCurrentTab] = useState<string>('buns');

  const bunsHeader = useRef<HTMLHeadingElement>(null);
  const saucesHeader = useRef<HTMLHeadingElement>(null);
  const mainsHeader = useRef<HTMLHeadingElement>(null);

  const [buns, inViewBuns] = useInView({threshold:0.3})
  const [sauces, inViewSauces] = useInView({threshold:1})
  const [mains, inViewMain] = useInView({threshold:0.4})

  const handleScrollIngredients = (): void => {
    inViewBuns && setCurrentTab('buns')
    inViewSauces && setCurrentTab('sauces')
    inViewMain && setCurrentTab('mains')
  }

  const scrollToNode = (e: any): void => {
    if (e === 'buns') {
      bunsHeader.current!.scrollIntoView({behavior: 'smooth'});
      setCurrentTab('buns')
    } else if (e === 'sauces') {
      saucesHeader.current!.scrollIntoView({behavior: 'smooth'});
      setCurrentTab('sauces')
    } else {
      mainsHeader.current!.scrollIntoView({behavior: 'smooth'});
      setCurrentTab('mains')
    }
  }

  const handleClickIngredient = (ingredient: TIngredientObject): void => {    
    dispatch(setIngredientDetails(ingredient))
    dispatch(showIngredientDetails())
  }

  return (
    <section className={main__block}>
      <section className="mt-10">
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <div className={[main__tabs, 'tabs'].join(' ')}>
          <Tab value="buns" active={currentTab === 'buns'} onClick={scrollToNode}>Булки</Tab>
          <Tab value="sauces" active={currentTab === 'sauces'} onClick={scrollToNode}>Соусы</Tab>
          <Tab value="mains" active={currentTab === 'mains'} onClick={scrollToNode}>Начинки</Tab>
        </div>
      </section>
      <section className={[ingredients__container, assembly__box].join(" ")} onScroll = {handleScrollIngredients} >
        <h2 className="text text_type_main-medium mb-6 bun" ref={bunsHeader}>Булки</h2>
        <div className={main__ingredients} ref={buns}>
          {ingredients.filter(ingredient => ingredient.type === 'bun').map((ingredient, index) => (
              <Ingredient
                ingredient={ingredient}
                handleClickIngredient={handleClickIngredient}
                key={ingredient._id}
                testIndex={`dnd_0${index}`}        
              />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6 sauce" ref={saucesHeader}>Соусы</h2>
        <div className={main__ingredients} ref={sauces}>
          {ingredients.filter(ingredient => ingredient.type === 'sauce').map((ingredient, index) => (
              <Ingredient
                ingredient={ingredient}
                handleClickIngredient={handleClickIngredient}
                key={ingredient._id}
                testIndex={`dnd_1${index}`} 
              />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6 main" ref={mainsHeader}>Начинки</h2>
        <div className={main__ingredients} ref={mains}>
          {ingredients.filter(ingredient => ingredient.type === 'main').map((ingredient, index) => (
              <Ingredient
                ingredient={ingredient}
                handleClickIngredient={handleClickIngredient}
                key={ingredient._id}
                testIndex={`dnd_2${index}`} 
              />
          ))}
        </div>
      </section>
    </section>
  )
}

export default BurgerIngredients;