import React, { useCallback } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header'; 
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Preloader from '../preloader/preloader';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from 'react-redux';
import { ingredientsFetchStatus, fetchedIngredients, fetchIngredients, closeIngredientDetails, modalViewIngredient } from '../../services/redux/ingredients-slice';
import { addIngredient, orderFetchStatus, closeOrder, modalViewOrder } from '../../services/redux/order-slice';

const App = () => {

  const dispatch = useDispatch();

  const ingredientWindow = useSelector(modalViewIngredient);
  const orderWindow = useSelector(modalViewOrder);

  const ingredientsStatus = useSelector(ingredientsFetchStatus);
  const orderStatus = useSelector(orderFetchStatus);
  
  const ingredients = useSelector(fetchedIngredients);

  const dropHandler = (itemId) => {
    const selectedIngredient = ingredients.filter(ingredient => ingredient._id === itemId._id);
    dispatch(addIngredient(selectedIngredient));
  }

  const closeModalWindow =  useCallback(() => {
    if (ingredientWindow) {
      return dispatch(closeIngredientDetails());
    } else if(orderWindow) {
      return dispatch(closeOrder());
    }
  }, [ingredientWindow, orderWindow, dispatch])

  React.useEffect(() => {
    if (ingredientsStatus === 'idle') {
      dispatch(fetchIngredients())
    }
    
    const handleDownEsc = (e) => {
      if (e.key !== 'Escape') {
        return 
      }
      closeModalWindow();
    }

    window.addEventListener('keydown', handleDownEsc);
    
    return () => {
      window.removeEventListener('keydown', handleDownEsc);
    }
  }, [dispatch, ingredientsStatus, orderStatus, closeModalWindow])

  const handleClickModal = target => {  
    if (target.classList.contains('closed') || target.classList.contains('overlay__closed')) {
      closeModalWindow();
    }
  }

  if (ingredientsStatus === 'loading') {
    return (
      <Preloader />
    )
  }
  
  return (
    <>
      <div id='app-modals'></div>
      {ingredientWindow && (
        <IngredientDetails
          handleClickIngredient={handleClickModal}
        />
      )}

      {orderWindow && orderStatus === 'succeeded' && (
        <OrderDetails
          handleClickOrder={handleClickModal}
        />
      )}
      
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
      <main className={styles.main__content}>
          <BurgerIngredients />
          <BurgerConstructor dropHandler={dropHandler} />
      </main>
      </DndProvider>
    </>
  );
}

export default App;