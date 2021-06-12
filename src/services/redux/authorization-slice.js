import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const registerApiUrl = 'https://norma.nomoreparties.space/api/auth/register';
const forgotApiUrl = 'https://norma.nomoreparties.space/api/password-reset';
const resetApiUrl = 'https://norma.nomoreparties.space/api/password-reset/reset';
const loginApiUrl = 'https://norma.nomoreparties.space/api/auth/login';
const logoutApiUrl = 'https://norma.nomoreparties.space/api/auth/logout';
const updateTokenApiUrl = 'https://norma.nomoreparties.space/api/auth/token';

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
} 

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
} 

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

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

export const login = createAsyncThunk('authorization/login', async (data) => {
  try {
    const res = await fetch(loginApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if(!res.ok) {
      throw new Error('сервер не смог обработать наш запрос')
    }

    // let authToken;
    // res.headers.forEach(header => {
    //   if (header.indexOf('Bearer') === 0) {
    //     authToken = header.split('Bearer ')[1];
    //   }
    // });
    // if (authToken) {
    //   setCookie('accessToken', authToken);
    //   console.log('КУКА:', authToken);
    // }

    const loginData = await res.json();
    return loginData
        
  } catch(e) {
    alert(`Что-то пошло не так. Ошибка: ${e}`)
  }
})

export const logout = createAsyncThunk('authorization/logout', async (data) => {
  try {
    const res = await fetch(logoutApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if(!res.ok) {
      throw new Error('сервер не смог обработать наш запрос')
    }

    const logoutData = await res.json();
    return logoutData
        
  } catch(e) {
    alert(`Что-то пошло не так. Ошибка: ${e}`)
  }
})

const initialState = {
  user: null,
  status: `idle`,
  error: null,
}

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    changeUserData: (state, action) => {
        state.user[action.payload.name] = action.payload.value;
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
      if (action.payload) {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.accessToken = action.payload.accessToken;
        localStorage.setItem('refreshToken', action.payload.refreshToken)
        console.log(localStorage.refreshToken);
        state.user.success = action.payload.success;
      }
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
    },
    [login.pending]: (state, action) => {
      state.status = 'loading';
    },
    [login.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      if (action.payload) {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken.split('Bearer ')[1];
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken.split('Bearer ')[1])
      }
    },
    [login.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [logout.pending]: (state, action) => {
      state.status = 'loading';
    },
    [logout.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    },
    [logout.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  }
})


export const resetTemplate = state => state.authorizationSlice.resetTemplate;
export const user = state => state.authorizationSlice.user;
export const refreshToken = state => state.authorizationSlice.refreshToken;
export const { changeUserData, changeResetTemplate } = authorizationSlice.actions
export default authorizationSlice.reducer