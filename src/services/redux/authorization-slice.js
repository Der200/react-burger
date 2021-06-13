import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const registerApiUrl = 'https://norma.nomoreparties.space/api/auth/register';
const forgotApiUrl = 'https://norma.nomoreparties.space/api/password-reset';
const resetApiUrl = 'https://norma.nomoreparties.space/api/password-reset/reset';
const loginApiUrl = 'https://norma.nomoreparties.space/api/auth/login';
const logoutApiUrl = 'https://norma.nomoreparties.space/api/auth/logout';
const updateTokenApiUrl = 'https://norma.nomoreparties.space/api/auth/token';
const updateUserDataApiUrl = 'https://norma.nomoreparties.space/api/auth/user';

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const refreshToken = () => {
  return fetch(updateTokenApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }).then(checkResponse);
}

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch(err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken.split('Bearer ')[1]);
      options.headers.Authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}

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
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)') //eslint-disable-line
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

export const updateUserData = createAsyncThunk('authorization/updateUserData', async (data) => {
  return await fetchWithRefresh(updateUserDataApiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('accessToken'),
    },
    body: JSON.stringify(data)
  })
})

export const getUserData = createAsyncThunk('authorization/getUserData', async () => {
  return await fetchWithRefresh(updateUserDataApiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('accessToken'),
    }
  });
})

const initialState = {
  user: null,
  authorizationStatus: `idle`,
  otherFetchsStatus: 'idle',
  error: null,
  recoveryCodeSent: false,
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
    [register.pending]: (state) => {
      state.authorizationStatus = 'loading';
    },
    [register.fulfilled]: (state, action) => {
      state.authorizationStatus = 'succeeded';
      state.user = action.payload.user;
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      setCookie('accessToken', action.payload.accessToken.split('Bearer ')[1]);
    },
    [register.rejected]: (state, action) => {
      state.authorizationStatus = 'failed';
      state.error = action.error.message;
    },
    [forgotPassword.pending]: (state) => {
      state.otherFetchsStatus = 'loading';
      state.recoveryCodeSent = true;
    },
    [forgotPassword.fulfilled]: (state) => {
      state.otherFetchsStatus = 'succeeded';
    },
    [forgotPassword.rejected]: (state, action) => {
      state.otherFetchsStatus = 'failed';
      state.error = action.error.message;
    },
    [resetPassword.pending]: (state) => {
      state.otherFetchsStatus = 'loading';
    },
    [resetPassword.fulfilled]: (state) => {
      state.otherFetchsStatus = 'succeeded';
      state.recoveryCodeSent = false;
    },
    [resetPassword.rejected]: (state, action) => {
      state.otherFetchsStatus = 'failed';
      state.error = action.error.message;
    },
    [login.pending]: (state) => {
      state.authorizationStatus = 'loading';
    },
    [login.fulfilled]: (state, action) => {
      state.authorizationStatus = 'succeeded';
      state.user = action.payload.user;
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      setCookie('accessToken', action.payload.accessToken.split('Bearer ')[1]);
    },
    [login.rejected]: (state, action) => {
      state.authorizationStatus = 'failed';
      state.error = action.error.message;
    },
    [logout.pending]: (state) => {
      state.otherFetchsStatus = 'loading';
    },
    [logout.fulfilled]: (state) => {
      state.otherFetchsStatus = 'succeeded';
      state.user = null;
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    },
    [logout.rejected]: (state, action) => {
      state.otherFetchsStatus = 'failed';
      state.error = action.error.message;
    },
    [updateUserData.pending]: (state) => {
      state.authorizationStatus = 'loading';
    },
    [updateUserData.fulfilled]: (state, action) => {
      state.authorizationStatus = 'succeeded';
      state.user = action.payload.user;
    },
    [updateUserData.rejected]: (state, action) => {
      state.authorizationStatus = 'failed';
      state.error = action.error.message;
    },
    [getUserData.pending]: (state) => {
      state.authorizationStatus = 'loading';
    },
    [getUserData.fulfilled]: (state, action) => {
      state.authorizationStatus = 'succeeded';
      state.user = action.payload.user;
      // state.updateData = false;
    },
    [getUserData.rejected]: (state, action) => {
      state.authorizationStatus = 'failed';
      state.error = action.error.message;
    },
  }
})

export const recoveryCodeStatus = state => state.authorizationSlice.recoveryCodeSent;
export const userStatus = state => state.authorizationSlice.authorizationStatus;
export const user = state => state.authorizationSlice.user;
export const { changeUserData, changeResetTemplate } = authorizationSlice.actions
export default authorizationSlice.reducer