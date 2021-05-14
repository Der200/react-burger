import React, { useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header'; 
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import IngredientsContext from '../../contexts/ingredients-context'
import OrderContext from '../../contexts/order-context'

const apiIngredientsURL = 'https://norma.nomoreparties.space/api/ingredients';
const apiOrderURL = 'https://norma.nomoreparties.space/api/orders';

const App = () => {
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
  const [ingredientsID, setIngredientsID] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const getOrderData = async () => {
    try {
      const res = await fetch(apiOrderURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          "ingredients": ingredientsID
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
      <main className={styles.main__content}>
        <IngredientsContext.Provider 
          value={{ingredients, 
                  setItemIngredient, 
                  setModalWindows, 
                  modalWindows}}>
          <BurgerIngredients />
        </IngredientsContext.Provider>

        <OrderContext.Provider 
          value={{ingredientsID, 
                  setIngredientsID,
                  totalPrice,         
                  getOrderData, 
                  setModalWindows, 
                  modalWindows, 
                  ingredients,
                  setTotalPrice}} >
          <BurgerConstructor />
        </OrderContext.Provider>
      </main>
    </>
  );
}

export default App;