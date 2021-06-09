import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const registerApiUrl = 'https://norma.nomoreparties.space/api/auth/register';
const forgotApiUrl = 'https://norma.nomoreparties.space/api/password-reset';
const resetApiUrl = 'https://norma.nomoreparties.space/api/password-reset/reset';

export const register = createAsyncThunk('authorization/register', async (data) => {
  try {
    const res = await fetch(registerApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if(!res.ok) {
      throw new Error('сервер не смог обработать наш запрос')
    }

    const registerData = await res.json();
    return registerData
        
  } catch(e) {
    alert(`Что-то пошло не так. Ошибка: ${e}`)
  }
})

export const forgotPassword = createAsyncThunk('authorization/forgotPassword', async (data) => {
  try {
    const res = await fetch(forgotApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if(!res.ok) {
      throw new Error('сервер не смог обработать наш запрос')
    }

    const forgotData = await res.json();
    return forgotData
        
  } catch(e) {
    alert(`Что-то пошло не так. Ошибка: ${e}`)
  }
})

export const resetPassword = createAsyncThunk('authorization/resetPassword', async (data) => {
  try {
    const res = await fetch(resetApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if(!res.ok) {
      throw new Error('сервер не смог обработать наш запрос')
    }

    const resetData = await res.json();
    return resetData
        
  } catch(e) {
    alert(`Что-то пошло не так. Ошибка: ${e}`)
  }
})

const initialState = {
  mockUser: {name: 'James', login: 'Bond', password: 'agent007', email: 'great@britain.com'},
  resetTemplate: {password: '', code: ''},
  status: `idle`,
  error: null,
}

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    changeUserData: (state, action) => {
        state.mockUser[action.payload.name] = action.payload.value;
    },
    changeResetTemplate: (state, action) => {
      state.resetTemplate[action.payload.name] = action.payload.value;
    },
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.status = 'loading';
    },
    [register.fulfilled]: (state, action) => {
      state.status = 'succeeded';
    },
    [register.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [forgotPassword.pending]: (state, action) => {
      state.status = 'loading';
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.status = 'succeeded';
    },
    [forgotPassword.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [resetPassword.pending]: (state, action) => {
      state.status = 'loading';
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.status = 'succeeded';
    },
    [resetPassword.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
})

// export const orderFetchStatus = state => state.orderSlice.status;
// export const orderDetails = state => state.orderSlice.orderDetails;
// export const orderIngredientsId = state => state.orderSlice.ingredientsID;
// export const orderCost = state => state.orderSlice.orderCost;
// export const feedOrders = state => state.orderSlice.feedOrders;
// export const orderIngredients = state => state.orderSlice.orderIngredients;
export const resetTemplate = state => state.authorizationSlice.resetTemplate;
export const user = state => state.authorizationSlice.mockUser;
export const { changeUserData, changeResetTemplate } = authorizationSlice.actions
export default authorizationSlice.reducer