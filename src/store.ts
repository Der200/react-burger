import { configureStore, ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './services/redux/index'
import { socketMiddleware } from './services/redux/ws-middleware';
import { WS_GET_MESSAGE, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_AUTH_MESSAGE, WS_CONNECTION_AUTH_SUCCESS, WS_CONNECTION_AUTH_CLOSED, WS_CONNECTION_AUTH_ERROR } from './services/redux/ws-slice/ws-slice';
import { createAction } from '@reduxjs/toolkit';

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const wsInit = createAction('WS_CONNECTION_START');
export const wsAuthInit = createAction('WS_CONNECTION_AUTH_START');
export const wsClose = createAction('WS_CLOSE');
export const wsAuthClose = createAction('WS_AUTH_CLOSE');

export interface IWsActions {
  onInit: ActionCreatorWithoutPayload<string>;
  onOpen: ActionCreatorWithPayload<string, string>;
  onClose: ActionCreatorWithPayload<string, string>;
  wsClose: ActionCreatorWithoutPayload<string>;
  onMessage: ActionCreatorWithPayload<any, string>;
  onError: ActionCreatorWithPayload<string, string> | ActionCreatorWithoutPayload<string>;
}

const wsActions: IWsActions = {
  onInit: wsInit,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsClose: wsClose
}

const wsAuthActions : IWsActions = {
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
    .concat(socketMiddleware('wss://norma.nomoreparties.space/orders/all', wsActions, false))
    .concat(socketMiddleware('wss://norma.nomoreparties.space/orders', wsAuthActions, true))
    .concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store