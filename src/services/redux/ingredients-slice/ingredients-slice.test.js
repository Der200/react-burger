import { setIngredientDetails, showIngredientDetails, closeIngredientDetails, fetchIngredients } from './ingredients-slice';
import ingredientsSlice from './ingredients-slice'

describe('ingredients slice reducers', () => {
  const initialState = {
    ingredientsData: [],
    selectedIngredientDetails: null,
    isShowIngredient: false,
    status: `idle`,
  }

  describe('setIngredientDetails reducer', () => {
    it('set current ingredient', () => {
      const action = {type: setIngredientDetails.type, payload: {id: 123, name: 'булка', type: 'bun'}};
      const state = ingredientsSlice(initialState, action);
      expect(state).toEqual({...state, selectedIngredientDetails: {id: 123, name: 'булка', type: 'bun'}});
    })
  })
  describe('showIngredientDetails reducer', () => {
    it('show selected ingredient data', () => {
      const action  = {type: showIngredientDetails.type};
      const state = ingredientsSlice(initialState, action);
      expect(state).toEqual({...state, isShowIngredient: true});
    })
  })
  describe('closeIngredientDetails reducer', () => {
    it('close selected ingredient window', () => {
      const action = {type: closeIngredientDetails.type};
      const state = ingredientsSlice(initialState, action);
      expect(state).toEqual({...state, isShowIngredient: false, selectedIngredientDetails: null})
    })
  })
  describe('fetchIngredients extrareducer', () => {
    it('pending fetch ingredients', () => {
      const action = {type: fetchIngredients.pending.type};
      const state = ingredientsSlice(initialState, action);
      expect(state).toEqual({...state, status: 'loading'})
    })
    it('fulfilled fetch ingredients', () => {
      const action = {type: fetchIngredients.fulfilled.type, 
                      payload: [{id: 123, name: 'булка', type: 'bun'}, {id: 456, name: 'соус', type: 'sauce'}]
                     };
      const state = ingredientsSlice(initialState, action);
      expect(state).toEqual({...state, status: 'succeeded', ingredientsData: action.payload})
    })
    it('fulfilled fetch ingredients for not empty ingredients array', () => {
      const action = {type: fetchIngredients.fulfilled.type, 
                      payload: [{id: 123, name: 'булка', type: 'bun'}, {id: 456, name: 'соус', type: 'sauce'}]
                     };
      const state = ingredientsSlice({...initialState, ingredientsData: [{id: 456, name: 'соус', type: 'sauce'}]}, action);
      expect(state).toEqual({...state, status: 'succeeded', ingredientsData: state.ingredientsData})
    })
    it('rejected fetch ingredients', () => {
      const action = {type: fetchIngredients.rejected.type};
      const state = ingredientsSlice(initialState, action);
      expect(state).toEqual({...state, status: 'failed'})
    })
  })
})