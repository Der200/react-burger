import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TSetCookieProps, TUserData } from '../../../utils/types';

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
  } catch(err: any) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken.split('Bearer ')[1]);
      options.headers.Authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return console.log(err);
    }
  }
}

export function setCookie(name: string, value: string | boolean | number, props?: TSetCookieProps) {
  props = {
    path: '/',
    ...props
  };
  let exp = props.expires;
  const d = new Date();

  if (typeof exp == 'number' && exp) {
    d.setTime(d.getTime() + exp * 1000);
    Number(d)
    props.expires = exp;
  }
  if (exp && d.toUTCString) {
    props.expires = d.toUTCString();
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

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)') //eslint-disable-line
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
} 

export function deleteCookie(name: string) {
  setCookie(name, false, { expires: -1 });
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
        
  } catch(e: any) {
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
        
  } catch(e: any) {
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
        
  } catch(e: any) {
    alert(`Что-то пошло не так. Ошибка: ${e}`)
  }
})

export const login = createAsyncThunk('authorization/login', async (data) => {
    const res = await fetch(loginApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if(!res.ok) {
      console.log(`Email or password incorrect`)
      throw new Error('сервер не смог обработать наш запрос')
    }

    const loginData = await res.json();
    return loginData
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
        
  } catch(e: any) {
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

type TAuthorizationState = {
  user: null | TUserData;
  authorizationStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  otherFetchsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  recoveryCodeSent: boolean;
}

const initialState: Readonly<TAuthorizationState> = {
  user: null,
  authorizationStatus: `idle`,
  otherFetchsStatus: 'idle',
  recoveryCodeSent: false,
}

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.authorizationStatus = 'loading';
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.authorizationStatus = 'succeeded';
      state.user = action.payload.user;
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      setCookie('accessToken', action.payload.accessToken.split('Bearer ')[1]);
    })
    builder.addCase(register.rejected, (state) => {
      state.authorizationStatus = 'failed';
    })
    builder.addCase(forgotPassword.pending, (state) => {
      state.otherFetchsStatus = 'loading';
    })
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.otherFetchsStatus = 'succeeded';
      state.recoveryCodeSent = true;
    })
    builder.addCase(forgotPassword.rejected, (state) => {
      state.otherFetchsStatus = 'failed';
    })
    builder.addCase(resetPassword.pending, (state) => {
      state.otherFetchsStatus = 'loading';
    })
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.otherFetchsStatus = 'succeeded';
      state.recoveryCodeSent = false;
    })
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.otherFetchsStatus = 'failed';
    })
    builder.addCase(login.pending, (state) => {
      state.authorizationStatus = 'loading';
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.authorizationStatus = 'succeeded';
      state.user = action.payload.user;
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      setCookie('accessToken', action.payload.accessToken.split('Bearer ')[1]);
    })
    builder.addCase(login.rejected, (state, action) => {
      state.authorizationStatus = 'failed';
    })
    builder.addCase(logout.pending, (state) => {
      state.otherFetchsStatus = 'loading';
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.otherFetchsStatus = 'succeeded';
      state.user = null;
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    })
    builder.addCase(logout.rejected, (state) => {
      state.otherFetchsStatus = 'failed';
    })
    builder.addCase(updateUserData.pending, (state) => {
      state.authorizationStatus = 'loading';
    })
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.authorizationStatus = 'succeeded';
      state.user = action.payload.user;
    })
    builder.addCase(updateUserData.rejected, (state, action) => {
      state.authorizationStatus = 'failed';
    })
    builder.addCase(getUserData.pending, (state) => {
      state.authorizationStatus = 'loading';
    })
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.authorizationStatus = 'succeeded';
      state.user = action.payload.user;
    })
    builder.addCase(getUserData.rejected, (state, action) => {
      state.authorizationStatus = 'failed';
    })
  },
})

export const recoveryCodeStatus = state => state.authorizationSlice.recoveryCodeSent;
export const userStatus = state => state.authorizationSlice.authorizationStatus;
export const user = state => state.authorizationSlice.user;
export default authorizationSlice.reducer