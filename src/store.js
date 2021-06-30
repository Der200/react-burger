import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './services/redux/index'
import { socketMiddleware } from './services/redux/ws-middleware';
import { WS_GET_MESSAGE, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_CLOSE } from './services/redux/ws-slice/ws-slice';

const wsActions = {
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  // wsClose: WS_CLOSE
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
    .concat(socketMiddleware('wss://norma.nomoreparties.space/orders/all', wsActions))
    .concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store