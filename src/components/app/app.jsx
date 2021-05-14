import React, { useState } from 'react';
import { Tab, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app.module.css';
import AppHeader from '../app-header/app-header'; 
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import IngredientContext from '../../contexts/ingredient-context'
import OrderContext from '../../contexts/order-context'

const apiIngredientsURL = 'https://norma.nomoreparties.space/api/ingredients';
const apiOrderURL = 'https://norma.nomoreparties.space/api/orders';

const App = () => {
  const {main__content, 
    main__tabs, 
    main__block, 
    main__ingredients,
    top__ingredient,
    bottom__ingredient, 
    ingredients__container, 
    order__container,
    assembly__box, 
    set__box,
    order__footer
  } = styles;

  const [currentTab, setCurrentTab] = useState('bun');
  const [ingredients, setIngredients] = useState({
    data: [],
    isLoading: true
  });
  const [order, setOrder] = useState({
    name: '',
    order: {},
    isLoading: true
  });
  const [itemIngredient, setItemIngredient] = useState(null);
  const [modalWindows, setModalWindows] = useState({isShowIngredient: false, isShowOrder: false});


  const ingredientIdsReducer = (ingredientIds, action) => {
    return [...ingredientIds, action.id];
  }
  const initialIngredientIds = [];
  const [ingredientIds, dispatcherIngredientIds] = React.useReducer(ingredientIdsReducer, initialIngredientIds);

  const priceReducer = (totalPrice, action) => {
    return totalPrice + action.data;
  }
  const initialTotalPrice = 0;
  const [totalPrice, dispatcherTotalPrice] = React.useReducer(priceReducer, initialTotalPrice);

  const getOrderData = async () => {
    try {
      const res = await fetch(apiOrderURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          "ingredients": ingredientIds
        })
      });
      
      if(!res.ok) {
        throw new Error('Сервер работает в штатном режиме')
      }

      const orderData = await res.json();

      setOrder({name: orderData.name, order: orderData.order, isLoading: false});
          
    } catch(e) {
        throw new Error(`Что-то пошло не так. Ошибка: ${e}`)
      }
  }

  const getIngredientData = async () => {
    try {
      const res = await fetch(apiIngredientsURL);
      
      if(!res.ok) {
        throw new Error('Сервер работает в штатном режиме')
      }

      const data = await res.json();
      setIngredients({data: data.data, isLoading: false});
          
    } catch(e) {
        throw new Error(`Что-то пошло не так. Ошибка: ${e}`)
      }
  }

  React.useEffect((modalWindows, order) => {
    getIngredientData();

    const handleDownEsc = (e) => {
      if (e.key !== 'Escape') {
        return
      }
      setModalWindows({...modalWindows, isShowIngredient: false, isShowOrder: false})
      setOrder({...order, isLoading: true});
    }

    window.addEventListener('keydown', handleDownEsc);


    
    return () => {
      window.removeEventListener('keydown', handleDownEsc);
    }
  }, [])

  const handleClickIngredient = ingredient => {
    setItemIngredient(ingredient)
    setModalWindows({...modalWindows, isShowIngredient: true})
  }

  const handleClickButton = () => {
    getOrderData();
    setModalWindows({...modalWindows, isShowOrder: true})
  }
  
  const handleClickModal = target => {  
    if (target.classList.contains('closed') || target.classList.contains('overlay__closed')) {
      setModalWindows({...modalWindows, isShowIngredient: false, isShowOrder: false})
      setOrder({...order, isLoading: true});
    }
  }

  if (ingredients.isLoading) {
    return (
      <div>Загрузка...</div>
    )
  }
  
  return (
    <>
      <div id='app-modals'></div>
      {modalWindows.isShowIngredient && (
        <IngredientDetails
          ingredient={itemIngredient}
          handleClickIngredient={handleClickModal}
        />
      )}
      
      {!order.isLoading && modalWindows.isShowOrder && (
        <OrderContext.Provider value={order}>
        <OrderDetails
          handleClickOrder={handleClickModal}
        />
        </OrderContext.Provider>
      )}
      
      <AppHeader />

      <main className={main__content}>
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
                <IngredientContext.Provider value={ingredient} key={ingredient._id + 'k'}>
                  <BurgerIngredients 
                    key={ingredient._id}
                    handleClickIngredient={handleClickIngredient}
                  />
                </IngredientContext.Provider>
              ))}
            </div>
            <h2 className="text text_type_main-medium mt-10 mb-6 sauce">Соусы</h2>
            <div className={main__ingredients}>
              {ingredients.data.filter(ingredient => ingredient.type === 'sauce').map((ingredient) => (
                <IngredientContext.Provider value={ingredient} key={ingredient._id + 'k'}>
                  <BurgerIngredients 
                    key={ingredient._id}
                    handleClickIngredient={handleClickIngredient}
                  />
                </IngredientContext.Provider>
              ))}
            </div>
            <h2 className="text text_type_main-medium mt-10 mb-6 main">Начинки</h2>
            <div className={main__ingredients}>
              {ingredients.data.filter(ingredient => ingredient.type === 'main').map((ingredient) => (
                <IngredientContext.Provider value={ingredient} key={ingredient._id + 'k'}>
                  <BurgerIngredients 
                    key={ingredient._id}
                    handleClickIngredient={handleClickIngredient}
                  />
                </IngredientContext.Provider>
              ))}
            </div>
          </section>
        </section>
        <section className={[main__block, set__box].join(" ")}>
          <OrderContext.Provider value={{dispatcherTotalPrice, dispatcherIngredientIds}} >
          <ul className={`${top__ingredient} mt-25 pl-5`}>
            {ingredients.data.filter(ingredient => ingredient.type === 'bun' && ingredient.fat === 24).map((ingredient) => (
              <li className="text text_type_main-default pb-4" key={ingredient._id}>
                <BurgerConstructor 
                  {...ingredient} 
                  type={'top'} 
                  isLocked={true} 
                />
              </li>
            ))}
          </ul>
          <ul className={order__container}>
            {ingredients.data.filter(ingredient => ingredient.type !== 'bun').map((ingredient) => (
              <li className="text text_type_main-default pb-4" key={ingredient._id}>
                <BurgerConstructor 
                  {...ingredient} 
                  type={null} 
                />
              </li>
            ))}
          </ul>
          <ul className={`${bottom__ingredient} pl-5`}>
            {ingredients.data.filter(ingredient => ingredient.type === 'bun' && ingredient.fat === 24).map((ingredient) => (
              <li className="text text_type_main-default pb-4" key={ingredient._id}>
                <BurgerConstructor 
                  {...ingredient} 
                  type={'bottom'} 
                  isLocked={true} 
                />
              </li>
            ))}
          </ul>
          <section className={order__footer}>
            <span className="text text_type_digits-default">
              {totalPrice}
              <CurrencyIcon type="primary" />
            </span>
            <div onClick={handleClickButton}>
              <Button>Оформить заказ</Button>
            </div>
          </section>
          </OrderContext.Provider>
        </section>
      </main>
    </>
  );
}

export default App;