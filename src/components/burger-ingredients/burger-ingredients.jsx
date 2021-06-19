import { useRef, useState } from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { useDispatch, useSelector } from 'react-redux';
import { fetchedIngredients, setIngredientDetails, showIngredientDetails } from '../../services/redux/ingredients-slice/ingredients-slice';
import { useInView } from 'react-intersection-observer';

const BurgerIngredients = () => {
  const ingredients = useSelector(fetchedIngredients);
  const {main__tabs, 
        main__block, 
        main__ingredients,
        ingredients__container, 
        assembly__box
  } = styles;

  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState('buns');

  const bunsHeader = useRef();
  const saucesHeader = useRef();
  const mainsHeader = useRef();

  const [buns, inViewBuns] = useInView({threshold:0.3})
  const [sauces, inViewSauces] = useInView({threshold:1})
  const [mains, inViewMain] = useInView({threshold:0.4})

  const handleScrollIngredients = () => {
    inViewBuns && setCurrentTab('buns')
    inViewSauces && setCurrentTab('sauces')
    inViewMain && setCurrentTab('mains')
  }

  const scrollToNode = (e) => {
    if (e === 'buns') {
      bunsHeader.current.scrollIntoView({behavior: 'smooth'});
      setCurrentTab('buns')
    } else if (e === 'sauces') {
      saucesHeader.current.scrollIntoView({behavior: 'smooth'});
      setCurrentTab('sauces')
    } else {
      mainsHeader.current.scrollIntoView({behavior: 'smooth'});
      setCurrentTab('mains')
    }

  }


  const handleClickIngredient = ingredient => {    
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
          {ingredients.filter(ingredient => ingredient.type === 'bun').map((ingredient) => (
              <Ingredient
                ingredient={ingredient}
                handleClickIngredient={handleClickIngredient}
                key={ingredient._id}        
              />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6 sauce" ref={saucesHeader}>Соусы</h2>
        <div className={main__ingredients} ref={sauces}>
          {ingredients.filter(ingredient => ingredient.type === 'sauce').map((ingredient) => (
              <Ingredient
                ingredient={ingredient}
                handleClickIngredient={handleClickIngredient}
                key={ingredient._id}
              />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6 main" ref={mainsHeader}>Начинки</h2>
        <div className={main__ingredients} ref={mains}>
          {ingredients.filter(ingredient => ingredient.type === 'main').map((ingredient) => (
              <Ingredient
                ingredient={ingredient}
                handleClickIngredient={handleClickIngredient}
                key={ingredient._id}
              />
          ))}
        </div>
      </section>
    </section>
  )
}

export default BurgerIngredients;