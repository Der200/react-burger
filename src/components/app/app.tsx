// librarys
import React, { useCallback, FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';

import styles from './app.module.css';

// components
import AppHeader from '../app-header/app-header'; 
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Preloader from '../preloader/preloader';
import ProtectedRoute from '../protected-route/protected-route';
import Modal from '../modal/modal';
import OrderTicket from '../order-ticket/order-ticket';

// pages
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import Orders from '../../pages/orders';
import Feed from '../../pages/feed';

// redux
import { addIngredient, orderFetchStatus, closeOrder, modalViewOrder, order } from '../../services/redux/order-slice/order-slice';
import { ingredientsFetchStatus, 
         fetchedIngredients, 
         fetchIngredients, 
         closeIngredientDetails, 
         modalViewIngredient } from '../../services/redux/ingredients-slice/ingredients-slice';
import { socketFlag } from '../../services/redux/ws-slice/ws-slice';
import { useAppSelector, useAppDispatch } from '../../utils/common';



const App : FC = () => {

  const dispatch = useAppDispatch();
  const history = useHistory();

  const ingredientWindow = useAppSelector(modalViewIngredient);
  const orderWindow = useAppSelector(modalViewOrder);
  const currentOrderWindow = useAppSelector(socketFlag)

  const ingredientsStatus = useAppSelector(ingredientsFetchStatus);
  const orderStatus = useAppSelector(orderFetchStatus);

  const currentOrder = useAppSelector(order);
  
  const ingredients = useAppSelector(fetchedIngredients);

  const dropHandler = (itemId) => {
    const selectedIngredient = ingredients.filter(ingredient => ingredient._id === itemId._id);
    dispatch(addIngredient(selectedIngredient[0]));
  }

  const closeModalWindow =  useCallback(() => {
    if (ingredientWindow) {
      history.replace('/')
      return dispatch(closeIngredientDetails());
    } else if(orderWindow) {
      return dispatch(closeOrder());
    } else {
      return history.goBack();
    }
  }, [ingredientWindow, orderWindow, dispatch])

  React.useEffect(() => {
    if (ingredientsStatus === 'idle') {
      // @ts-ignore
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
            <IngredientDetails type='url' />
          </Route>
          <Route exact path="/">
            <BurgerIngredients />
            <BurgerConstructor dropHandler={dropHandler} />
          </Route>
          
        </Switch>
      </main>
      </DndProvider>
      
      {ingredientWindow && (
          <Modal title='Детали ингредиента' handleClickModal={handleClickModal}>
            <IngredientDetails />
          </Modal>
      )}

      {orderWindow && orderStatus === 'succeeded' && (
        <OrderDetails
          handleClickOrder={handleClickModal}
        />
      )}

      {currentOrderWindow && 
      <Route exact path="/feed/:id">
        <Modal title={`#${currentOrder !== null ? currentOrder.number : ''}`} handleClickModal={handleClickModal}>
          <OrderTicket type='modal'/>
        </Modal>
      </Route> 
      }
      {currentOrderWindow && 
      <ProtectedRoute exact path="/profile/orders/:id">
        <Modal title={`#${currentOrder !== null ? currentOrder.number : ''}`} handleClickModal={handleClickModal}>
          <OrderTicket type='modal'/>
        </Modal>
      </ProtectedRoute>
      }
    </>
  );
}

export default App;