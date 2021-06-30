import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wsConnected: false,
  wsError: null,
  wsMessage: []
}

export const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    WS_CONNECTION_SUCCESS: (state, action) => {
      state.wsConnected = true;
    },
    WS_CONNECTION_ERROR: (state, action) => {
      state.wsConnected = false;
      state.wsError = action.payload;
    },
    WS_CONNECTION_CLOSED: (state, action) => {
      state.wsConnected = false;
      state.wsError = null;
    },
    WS_GET_MESSAGE: (state, action) => {
      console.log(action.payload)
      state.wsMessage = action.payload;
    }
  }
})

export const socketStatus = state => state.wsSlice.wsConnected;
export const message = state => state.wsSlice.wsMessage;
export const { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE } = wsSlice.actions
export default wsSlice.reducer