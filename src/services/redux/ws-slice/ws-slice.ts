import { TWsMessageObject } from './../../../utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TWsSliceState = {
  wsConnected: boolean;
  wsUsed: boolean;
  wsAuthConnected: boolean;
  wsError: string | null;
  wsAuthError: string | null;
  wsMessage: Array<TWsMessageObject> | {};
  wsAuthMessage: Array<TWsMessageObject> | {};
}

const initialState: Readonly<TWsSliceState> = {
  wsConnected: false,
  wsUsed: false,
  wsAuthConnected: false,
  wsError: null,
  wsAuthError: null,
  wsMessage: {},
  wsAuthMessage: {}
}

export const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    WS_CONNECTION_SUCCESS: (state) => {
      state.wsConnected = true;
      state.wsUsed = true;
    },
    WS_CONNECTION_ERROR: (state, action: PayloadAction<string>) => {
      state.wsConnected = false;
      state.wsError = action.payload;
    },
    WS_CONNECTION_CLOSED: (state) => {
      state.wsConnected = false;
      state.wsError = null;
    },
    WS_GET_MESSAGE: (state, action: PayloadAction<TWsMessageObject>) => {
      state.wsMessage = action.payload;
    },
    WS_CONNECTION_AUTH_SUCCESS: (state) => {
      state.wsAuthConnected = true;
      state.wsUsed = true;
    },
    WS_CONNECTION_AUTH_ERROR: (state, action: PayloadAction<string>) => {
      state.wsAuthConnected = false;
      state.wsAuthError = action.payload;
    },
    WS_CONNECTION_AUTH_CLOSED: (state) => {
      state.wsAuthConnected = false;
      state.wsAuthError = null;
    },
    WS_GET_AUTH_MESSAGE: (state, action: PayloadAction<TWsMessageObject>) => {
      state.wsAuthMessage = action.payload;
    }
  }
})

export const socketAuthStatus = state => state.wsSlice.wsAuthConnected;
export const socketFlag = state => state.wsSlice.wsUsed;
export const socketStatus = state => state.wsSlice.wsConnected;
export const authMessage = state => state.wsSlice.wsAuthMessage;
export const message = state => state.wsSlice.wsMessage;
export const { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE, WS_GET_AUTH_MESSAGE, WS_CONNECTION_AUTH_SUCCESS, WS_CONNECTION_AUTH_ERROR, WS_CONNECTION_AUTH_CLOSED } = wsSlice.actions;
export default wsSlice.reducer