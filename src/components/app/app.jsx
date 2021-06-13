import React, { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header'; 
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Preloader from '../preloader/preloader';
import ProtectedRoute from '../protected-route/protected-route';
import Modal from '../modal/modal';

import { addIngredient, orderFetchStatus, closeOrder, modalViewOrder, order } from '../../services/redux/order-slice';
import { ingredientsFetchStatus, 
         fetchedIngredients, 
         fetchIngredients, 
         closeIngredientDetails, 
         modalViewIngredient } from '../../services/redux/ingredients-slice';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import Orders from '../../pages/orders';
import Feed from '../../pages/feed';
import OrderTicket from '../order-ticket/order-ticket';


const App = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const ingredientWindow = useSelector(modalViewIngredient);
  const orderWindow = useSelector(modalViewOrder);

  const ingredientsStatus = useSelector(ingredientsFetchStatus);
  const orderStatus = useSelector(orderFetchStatus);

  const currentOrder = useSelector(order);
  
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
    } else {
      return history.goBack();
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
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
      <main className={styles.main__content}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <ProtectedRoute exact path="/profile">
            <Profile/>
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile/orders">
            <Orders/>
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile/orders/:id">
            <OrderTicket/>
          </ProtectedRoute>
          <Route exact path="/feed" component={Feed} />
          <Route exact path="/feed/:id" component={OrderTicket} />
          <Route exact path="/ingredient/:id">
            <IngredientDetails type='url' handleClickIngredient={handleClickModal} />
          </Route>
          <Route exact path="/">
            <BurgerIngredients />
            <BurgerConstructor dropHandler={dropHandler} />
          </Route>
          
        </Switch>
      </main>
      </DndProvider>

      <div id='app-modals'></div>
      {ingredientWindow && (
        <Modal title='Детали ингредиента' handleClickModal={handleClickModal}>
          <IngredientDetails handleClickIngredient={handleClickModal} />
        </Modal>
      )}

      {orderWindow && orderStatus === 'succeeded' && (
        <OrderDetails
          handleClickOrder={handleClickModal}
        />
      )}
      <Route exact path="/feed/:id">
        <Modal title={`#0${currentOrder !== null ? currentOrder.id : ''}`} handleClickModal={handleClickModal}>
          <OrderTicket type='modal'/>
        </Modal>
      </Route>
      <ProtectedRoute exact path="/profile/orders/:id">
        <Modal title={`#0${currentOrder !== null ? currentOrder.id : ''}`} handleClickModal={handleClickModal}>
          <OrderTicket type='modal'/>
        </Modal>
      </ProtectedRoute>
    </>
  );
}

export default App;