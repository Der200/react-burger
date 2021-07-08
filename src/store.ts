import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {Middleware, AnyAction} from 'redux';
import {ThunkMiddleware} from 'redux-thunk';
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
  onInit: string;
  onOpen: string;
  onClose: string;
  wsClose: string;
  onMessage: string;
  onError: string;
}

const wsActions: IWsActions = {
  onInit: wsInit.toString(),
  onOpen: WS_CONNECTION_SUCCESS.toString(),
  onClose: WS_CONNECTION_CLOSED.toString(),
  onError: WS_CONNECTION_ERROR.toString(),
  onMessage: WS_GET_MESSAGE.toString(),
  wsClose: wsClose.toString()
}

const wsAuthActions : IWsActions = {
  onInit: wsAuthInit.toString(),
  onOpen: WS_CONNECTION_AUTH_SUCCESS.toString(),
  onClose: WS_CONNECTION_AUTH_CLOSED.toString(),
  onError: WS_CONNECTION_AUTH_ERROR.toString(),
  onMessage: WS_GET_AUTH_MESSAGE.toString(),
  wsClose: wsAuthClose.toString()
}

const middleware: Array<Middleware<{}, RootState> | ThunkMiddleware<RootState, AnyAction>> = [
  socketMiddleware('wss://norma.nomoreparties.space/orders/all', wsActions, false),
  socketMiddleware('wss://norma.nomoreparties.space/orders', wsAuthActions, true),
  ...getDefaultMiddleware<RootState>()
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store