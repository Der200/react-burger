import { register, forgotPassword, resetPassword, login, logout, updateUserData, getUserData } from './authorization-slice';
import authorizationSlice from './authorization-slice';

describe('authorization slice reducers', () => {
  const initialState = {
    user: null,
    authorizationStatus: `idle`,
    otherFetchsStatus: 'idle',
    recoveryCodeSent: false,
  }

  describe('register extrareducer', () => {
    it('pending fetch register', () => {
      const action = {type: register.pending.type};
      const state = authorizationSlice(initialState, action);
      expect(state).toEqual({...state, authorizationStatus: 'loading'})
    })
    it('fulfilled fetch register', () => {
      const action = {type: register.fulfilled.type, 
                      payload: {success: true, user: {email: '1@1.ru', name: 'James'}, accessToken: 'Bearer123', refreshToken: '11011011001'}
                     };
      const state = authorizationSlice(initialState, action);
      expect(state).toEqual({...state, 
                             authorizationStatus: 'succeeded', 
                             user: {
                               email: '1@1.ru',
                               name: 'James'
                             }})
    })
    it('rejected fetch register', () => {
      const action = {type: register.rejected.type};
      const state = authorizationSlice(initialState, action);
      expect(state).toEqual({...state, authorizationStatus: 'failed'})
    })
  })
  describe('forgotPassword extrareducer', () => {
    it('pending fetch forgot password', () => {
      const action = {type: forgotPassword.pending.type};
      const state = authorizationSlice(initialState, action);
      expect(state).toEqual({...state, otherFetchsStatus: 'loading'})
    })
    it('fulfilled fetch forgot password', () => {
      const action = {type: forgotPassword.fulfilled.type};
      const state = authorizationSlice({...initialState, otherFetchsStatus: 'loading'}, action);
      expect(state).toEqual({...state, 
                             otherFetchsStatus: 'succeeded', 
                             recoveryCodeSent: true})
    })
    it('rejected fetch forgot password', () => {
      const action = {type: forgotPassword.rejected.type};
      const state = authorizationSlice({...initialState, otherFetchsStatus: 'loading'}, action);
      expect(state).toEqual({...state, otherFetchsStatus: 'failed'})
    })
  })
  describe('resetPassword extrareducer', () => {
    it('pending fetch reset password', () => {
      const action = {type: resetPassword.pending.type};
      const state = authorizationSlice(initialState, action);
      expect(state).toEqual({...state, otherFetchsStatus: 'loading'})
    })
    it('fulfilled fetch reset password', () => {
      const action = {type: resetPassword.fulfilled.type};
      const state = authorizationSlice({...initialState, otherFetchsStatus: 'loading'}, action);
      expect(state).toEqual({...state, 
                             otherFetchsStatus: 'succeeded', 
                             recoveryCodeSent: false})
    })
    it('rejected fetch reset password', () => {
      const action = {type: resetPassword.rejected.type};
      const state = authorizationSlice({...initialState, otherFetchsStatus: 'loading'}, action);
      expect(state).toEqual({...state, otherFetchsStatus: 'failed'})
    })
  })
  describe('login extrareducer', () => {
    it('pending fetch login', () => {
      const action = {type: login.pending.type};
      const state = authorizationSlice(initialState, action);
      expect(state).toEqual({...state, authorizationStatus: 'loading'})
    })
    it('fulfilled fetch login', () => {
      const action = {type: login.fulfilled.type, payload: {success: true, 
                                                            user: {email: '1@1.ru', name: 'James'}, 
                                                            accessToken: 'Bearer123', 
                                                            refreshToken: '11011011001'}};
      const state = authorizationSlice({...initialState, authorizationStatus: 'loading'}, action);
      expect(state).toEqual({...state, 
                             authorizationStatus: 'succeeded', 
                             user: {
                               email: '1@1.ru',
                               name: 'James'
                             }})
    })
    it('rejected fetch login', () => {
      const action = {type: login.rejected.type};
      const state = authorizationSlice({...initialState, authorizationStatus: 'loading'}, action);
      expect(state).toEqual({...state, authorizationStatus: 'failed'})
    })
  })
  describe('logout extrareducer', () => {
    it('pending fetch logout', () => {
      const action = {type: logout.pending.type};
      const state = authorizationSlice(initialState, action);
      expect(state).toEqual({...state, otherFetchsStatus: 'loading'})
    })
    it('fulfilled fetch logout', () => {
      const action = {type: logout.fulfilled.type};
      const state = authorizationSlice({...initialState, otherFetchsStatus: 'loading'}, action);
      expect(state).toEqual({...state, 
                             otherFetchsStatus: 'succeeded', 
                             user: null})
    })
    it('rejected fetch logout', () => {
      const action = {type: logout.rejected.type};
      const state = authorizationSlice({...initialState, otherFetchsStatus: 'loading'}, action);
      expect(state).toEqual({...state, otherFetchsStatus: 'failed'})
    })
  })
  describe('updateUserData extrareducer', () => {
    it('pending fetch update user data', () => {
      const action = {type: updateUserData.pending.type};
      const state = authorizationSlice(initialState, action);
      expect(state).toEqual({...state, authorizationStatus: 'loading'})
    })
    it('fulfilled fetch update user data', () => {
      const action = {type: updateUserData.fulfilled.type, payload: {success: true, 
                                                                    user: {email: '1@1.ru', name: 'James'}, 
                                                                    accessToken: 'Bearer123', 
                                                                    refreshToken: '11011011001'}};;
      const state = authorizationSlice({...initialState, authorizationStatus: 'loading'}, action);
      expect(state).toEqual({...state, 
                             authorizationStatus: 'succeeded', 
                             user: {
                               email: '1@1.ru',
                               name: 'James'
                             }})
    })
    it('rejected fetch update user data', () => {
      const action = {type: updateUserData.rejected.type};
      const state = authorizationSlice({...initialState, authorizationStatus: 'loading'}, action);
      expect(state).toEqual({...state, authorizationStatus: 'failed'})
    })
  })
  describe('getUserData extrareducer', () => {
    it('pending fetch get user data', () => {
      const action = {type: getUserData.pending.type};
      const state = authorizationSlice(initialState, action);
      expect(state).toEqual({...state, authorizationStatus: 'loading'})
    })
    it('fulfilled fetch get user data', () => {
      const action = {type: getUserData.fulfilled.type, payload: {success: true, 
                                                                    user: {email: '1@1.ru', name: 'James'}, 
                                                                    accessToken: 'Bearer123', 
                                                                    refreshToken: '11011011001'}};;
      const state = authorizationSlice({...initialState, authorizationStatus: 'loading'}, action);
      expect(state).toEqual({...state, 
                             authorizationStatus: 'succeeded', 
                             user: {
                               email: '1@1.ru',
                               name: 'James'
                             }})
    })
    it('rejected fetch get user data', () => {
      const action = {type: getUserData.rejected.type};
      const state = authorizationSlice({...initialState, authorizationStatus: 'loading'}, action);
      expect(state).toEqual({...state, authorizationStatus: 'failed'})
    })
  })
})