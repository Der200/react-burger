import React from 'react';
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
import { closeWindows, modalViewIngredient, modalViewOrder } from '../../services/redux/modal-slice';
import { ingredientsFetchStatus, fetchedIngredients, fetchIngredients } from '../../services/redux/ingredients-slice';
import { addIngredient, orderFetchStatus } from '../../services/redux/order-slice';

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

  React.useEffect(() => {
    if (ingredientsStatus === 'idle') {
      dispatch(fetchIngredients())
    }
    
    const handleDownEsc = (e) => {
      if (e.key !== 'Escape') {
        return 
      }
      dispatch(closeWindows());
    }

    window.addEventListener('keydown', handleDownEsc);
    
    return () => {
      window.removeEventListener('keydown', handleDownEsc);
    }
  }, [dispatch, orderWindow, ingredientWindow, ingredientsStatus, orderStatus])

  const handleClickModal = target => {  
    if (target.classList.contains('closed') || target.classList.contains('overlay__closed')) {
      dispatch(closeWindows());
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