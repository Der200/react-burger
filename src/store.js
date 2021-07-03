import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './services/redux/index'
import { socketMiddleware } from './services/redux/ws-middleware';
import { WS_GET_MESSAGE, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_AUTH_MESSAGE, WS_CONNECTION_AUTH_SUCCESS, WS_CONNECTION_AUTH_CLOSED, WS_CONNECTION_AUTH_ERROR, WS_CLOSE } from './services/redux/ws-slice/ws-slice';
import { createAction } from '@reduxjs/toolkit';

export const wsInit = createAction('WS_CONNECTION_START');
export const wsAuthInit = createAction('WS_CONNECTION_AUTH_START');
export const wsClose = createAction('WS_CLOSE');
export const wsAuthClose = createAction('WS_AUTH_CLOSE')

const wsActions = {
  onInit: wsInit,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsClose: wsClose
}

const wsAuthActions = {
  onInit: wsAuthInit,
  onOpen: WS_CONNECTION_AUTH_SUCCESS,
  onClose: WS_CONNECTION_AUTH_CLOSED,
  onError: WS_CONNECTION_AUTH_ERROR,
  onMessage: WS_GET_AUTH_MESSAGE,
  wsClose: wsAuthClose
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
    .concat(socketMiddleware('wss://norma.nomoreparties.space/orders/all', wsActions))
    .concat(socketMiddleware('wss://norma.nomoreparties.space/orders', wsAuthActions, true))
    .concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store