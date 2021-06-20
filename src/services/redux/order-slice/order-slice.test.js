import { addIngredient, 
         deleteIngredient, 
         sortingIngredients, 
         showOrder, 
         closeOrder, 
         setCurrentOrder, 
         placeAnOrder } from './order-slice';
import orderSlice from './order-slice'

describe('order slice reducers', () => {
  const initialState = {
    orderIngredients: [],
    mainIngredients: [],
    feedOrders: [],
    ingredientsID: [],
    orderCost: 0,
    status: `idle`,
    error: null,
    orderDetails: {
      name: '',
      number: '',
    },
    isShowOrder: false,
    isShowOrderDetails: false,
    currentOrder: null,
  }

  describe('addIngredient reducer', () => {
    it('add bun ingredient in array with bun', () => {
      const action = {type: addIngredient.type, payload: {_id: "60c9dcba45f4920027090276", type:"bun", price: 988}};
      const state = orderSlice({...initialState, 
                                orderIngredients: [{_id: "60c9dcba45f4920027090275", type:"bun", price: 1255}],
                                ingredientsID: ["60c9dcba45f4920027090275"],
                                orderCost: 2510}, action);
      expect(state).toEqual({...state, 
                             orderIngredients: [{_id: "60c9dcba45f4920027090276", type:"bun", price: 988}],
                             ingredientsID: ["60c9dcba45f4920027090276"],
                             orderCost: 1976});
    })
    it('add ingredient in array without bun', () => {
      const action = {type: addIngredient.type, payload: {_id: "60c9dcba45f4920027090276", type:"bun", price: 988}};
      const state = orderSlice({...initialState}, action);
      expect(state).toEqual({...state, 
                             orderIngredients: [{_id: "60c9dcba45f4920027090276", type:"bun", price: 988}],
                             ingredientsID: ["60c9dcba45f4920027090276"],
                             orderCost: 1976});
    })
  })
  describe('deleteIngredient reducer', () => {
    it('delete ingredient from order array', () => {
      const action = {type: deleteIngredient.type, payload: {_id: "60c9dcba45f4920027090275", type:"sauce", price: 1255}};
      const state = orderSlice({...initialState, 
                                orderIngredients: [{_id: "60c9dcba45f4920027090275", type:"sauce", price: 1255}],
                                mainIngredients: [{_id: "60c9dcba45f4920027090275", type:"sauce", price: 1255}],
                                ingredientsID: ["60c9dcba45f4920027090275"],
                                orderCost: 1255}, action);
      expect(state).toEqual({...state, 
                             orderIngredients: [],
                             mainIngredients: [],
                             ingredientsID: [],
                             orderCost: 0});
    })
  })
  describe('sortingIngredients reducer', () => {
    it('sorting ingredients with main ingredients array', () => {
      const action = {type: sortingIngredients.type, payload: {indexFrom: 1, indexTo: 0}};
      const state = orderSlice({...initialState, 
                                mainIngredients: [{elem1: 1}, {elem2: 2}]}, action);
      expect(state).toEqual({...state, 
                             mainIngredients: [{elem2: 2}, {elem1: 1}]});
    })
  })
  describe('showOrder reducer', () => {
    it('show window current order', () => {
      const action = {type: showOrder.type};
      const state = orderSlice(initialState, action);
      expect(state).toEqual({...state, isShowOrder: true});
    })
  })
  describe('closeOrder reducer', () => {
    it('close window current order', () => {
      const action = {type: closeOrder.type};
      const state = orderSlice({...initialState,
                                isShowOrder: true,
                                orderIngredients: [{elem1: 1}, {elem2: 2}],
                                mainIngredients: [{elem1: 1}, {elem2: 2}, {elem3: 3}],
                                orderCost: 5422,
                                orderDetails: {
                                  name: 'nameOrder',
                                  number: '42'
                                }}, action);
      expect(state).toEqual({...state, 
                             isShowOrder: false,
                             orderIngredients: [],
                             mainIngredients: [],
                             orderCost: 0,
                             orderDetails: {
                               name: '',
                               number: ''
                             }});
    })
  })
  describe('setCurrentOrder reducer', () => {
    it('set current order in feed or profile orders', () => {
      const action = {type: setCurrentOrder.type, payload: 42};
      const state = orderSlice({...initialState,
                                feedOrders: [{id: 1244}, {id: 42}]}, action);
      expect(state).toEqual({...state, currentOrder: {id: 42}});
    })
  })
  describe('placeAnOrder extrareducer', () => {
    it('pending fetch order', () => {
      const action = {type: placeAnOrder.pending.type};
      const state = orderSlice(initialState, action);
      expect(state).toEqual({...state, status: 'loading'})
    })
    it('fulfilled fetch order', () => {
      const action = {type: placeAnOrder.fulfilled.type, 
                      payload: {success: true, name: 'Имя заказа', order: {number: 42}}
                     };
      const state = orderSlice({...initialState,
                                orderCost: 200,
                                orderIngredients: [{elem1: 1}, {elem2: 2}]}, action);
      expect(state).toEqual({...state, 
                             status: 'succeeded', 
                             orderDetails: {
                               name: 'Имя заказа',
                               number: 42
                             },
                             feedOrders: [{id: 42, name: 'Имя заказа', cost: 200, ingredients: [{elem1: 1}, {elem2: 2}]}] })
    })
    it('rejected fetch order', () => {
      const action = {type: placeAnOrder.rejected.type};
      const state = orderSlice(initialState, action);
      expect(state).toEqual({...state, status: 'failed'})
    })
  })
})