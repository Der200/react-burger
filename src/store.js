import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './services/reducers/index'

// const preloadedState = {
//   ingredients: [],
//   orderIngredients: [],
//   ingredientDetails: {},
//   order: {},
//   modalSlice: {
//     isShowIngredient: false,
//     isShowOrder: false,
//   }
// }

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  // preloadedState,
})

export default store