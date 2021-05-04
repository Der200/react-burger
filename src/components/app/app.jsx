import React from 'react';
import { Tab, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app.module.css';
import AppHeader from '../app-header/app-header'; 
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

const apiURL = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
  const [current, setCurrent] = React.useState('bun');
  const [state, setstate] = React.useState({
    data: [],
    isLoading: true
  });
  const [itemIngredient, setItemIngredient] = React.useState(null)
  const [show, setShow] = React.useState({isShowIngredient: false, isShowOrder: false})
  const {main__content, 
          main__tabs, 
          main__block, 
          main__ingredients, 
          ingredients__container, 
          order__container,
          assembly__box, 
          set__box,
          order__footer
  } = styles;

  const getIngredientData = async () => {
    try {
      const res = await fetch(apiURL);
      
      if(!res.ok) throw new Error('Сервер работает в штатном режиме')
          const data = await res.json();
          setstate({data: data.data, isLoading: false});
          
      } catch(e){
        throw new Error(`Что-то пошло не так. Ошибка: ${e}`)
      }
  }
    
  React.useEffect(() => {
    getIngredientData();
    window.addEventListener('keydown', handleDownEsc);
    
    return () => {
      window.removeEventListener('keydown', handleDownEsc);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickIngredient = ingredient => {
    setItemIngredient(ingredient)
    setShow({...show, isShowIngredient: true})
  }

  const handleClickButton = () => setShow({...show, isShowOrder: true})
  
  const handleClickModal = target => {  
    if (target.classList.contains('closed') || target.classList.contains('overlay__closed'))
    setShow({...show, isShowIngredient: false, isShowOrder: false})
  }

  const handleDownEsc = (e) => {
    if (e.key !== 'Escape') {
      return
    }
    setShow({...show, isShowIngredient: false, isShowOrder: false})
  }

  if (state.isLoading) {
    return (
      <div>Загрузка...</div>
    )
  }
  
  return (
    <>
      <div id='app-modals'></div>
      {show.isShowIngredient && (
        <IngredientDetails
          ingredient={itemIngredient}
          handleClickIngredient={handleClickModal}
        />
      )}
      {show.isShowOrder && (
        <OrderDetails
          handleClickOrder={handleClickModal}
          orderNumber={'034536'}
        />
      )}
      <AppHeader />
      <main className={main__content}>
        <section className={main__block}>
          <section className="mt-10">
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={[main__tabs, 'tabs'].join(' ')}>
              <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
              <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
              <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
            </div>
          </section>
          <section className={[ingredients__container, assembly__box].join(" ")}>
            <h2 className="text text_type_main-medium mb-6 bun">Булки</h2>
            <div className={main__ingredients}>
              {state.data.filter(ingredient => ingredient.type === 'bun').map((ingredient) => (
                  <BurgerConstructor 
                    key={ingredient._id} 
                    {...ingredient} 
                    handleClickIngredient={handleClickIngredient} 
                    ingredient={ingredient}
                  />
              ))}
            </div>
            <h2 className="text text_type_main-medium mt-10 mb-6 sauce">Соусы</h2>
            <div className={main__ingredients}>
              {state.data.filter(ingredient => ingredient.type === 'sauce').map((ingredient) => (
                  <BurgerConstructor 
                    key={ingredient._id} 
                    {...ingredient} 
                    handleClickIngredient={handleClickIngredient} 
                    ingredient={ingredient}
                  />
              ))}
            </div>
            <h2 className="text text_type_main-medium mt-10 mb-6 main">Начинки</h2>
            <div className={main__ingredients}>
              {state.data.filter(ingredient => ingredient.type === 'main').map((ingredient) => (
                  <BurgerConstructor 
                    key={ingredient._id} 
                    {...ingredient} 
                    handleClickIngredient={handleClickIngredient} 
                    ingredient={ingredient}
                  />
              ))}
            </div>
          </section>
        </section>
        <section className={[main__block, set__box].join(" ")}>
          <ul className="mt-25 pl-5">
            {state.data.filter(ingredient => ingredient.type === 'bun' && ingredient.fat === 24).map((ingredient) => (
              <li className="text text_type_main-default pb-4" key={ingredient._id}>
                <BurgerIngredients 
                  {...ingredient} 
                  type={'top'} 
                  isLocked={true} 
                />
              </li>
            ))}
          </ul>
          <ul className={order__container}>
            {state.data.filter(ingredient => ingredient.type === 'main' || ingredient.type === 'sauce').map((ingredient) => (
              <li className="text text_type_main-default pb-4" key={ingredient._id}>
                <BurgerIngredients 
                  {...ingredient} 
                  type={null} 
                />
              </li>
            ))}
          </ul>
          <ul className="pl-5">
            {state.data.filter(ingredient => ingredient.type === 'bun' && ingredient.fat === 26).map((ingredient) => (
              <li className="text text_type_main-default pb-4" key={ingredient._id}>
                <BurgerIngredients 
                  {...ingredient} 
                  type={'bottom'} 
                  isLocked={true} 
                />
              </li>
            ))}
          </ul>
          <section className={order__footer}>
            <span className="text text_type_digits-default">
              {state.data.reduce((total, ingredient) => (total + ingredient.price), 0)}
              <CurrencyIcon type="primary" />
            </span>
            <div onClick={handleClickButton}>
              <Button>Оформить заказ</Button>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

export default App;