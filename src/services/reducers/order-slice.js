import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const orderApiUrl = 'https://norma.nomoreparties.space/api/orders';

export const placeAnOrder = createAsyncThunk('order/placeAnOrder', async (order) => {
  try {
    const res = await fetch(orderApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        "ingredients": order
      })
    });
    
    if(!res.ok) {
      throw new Error('Сервер работает в штатном режиме')
    }

    const orderData = await res.json();
    console.log(orderData)
    return orderData
    //setOrder({name: orderData.name, order: orderData.order, isLoading: false});
        
  } catch(e) {
      throw new Error(`Что-то пошло не так. Ошибка: ${e}`)
    }
})

const initialState = {
  orderIngredients: [],
  ingredientsID: [],
  orderCost: 0,
  status: `idle`,
  error: null,
  orderDetails: {
    name: '',
    number: '',
  }
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload[0].type === 'bun' && state.orderIngredients.find(ingredient => ingredient.type === 'bun') ) {
        state.orderCost = state.orderCost - (state.orderIngredients.find(ingredient => ingredient.type === 'bun').price * 2)
        state.ingredientsID = state.ingredientsID.filter(ingredient => ingredient !== state.orderIngredients.find(ingredient => ingredient.type === 'bun')._id)
        state.ingredientsID = [...state.ingredientsID, action.payload[0]._id]
        state.orderIngredients = state.orderIngredients.filter(ingredient => ingredient.type !== 'bun')
        state.orderIngredients = state.orderIngredients.concat(action.payload)
        state.orderCost = state.orderCost + (action.payload[0].price * 2)

      } else if (action.payload[0].type === 'bun') {
        state.ingredientsID = [...state.ingredientsID, action.payload[0]._id]
        state.orderIngredients = state.orderIngredients.concat(action.payload)
        state.orderCost = state.orderCost + (action.payload[0].price * 2)

      } else {
        state.ingredientsID = [...state.ingredientsID, action.payload[0]._id]
        state.orderIngredients = state.orderIngredients.concat(action.payload)
        state.orderCost = state.orderCost + action.payload[0].price
      }
    },
    deleteIngredient: (state, action) => {
      const indexSelectingIngredient = state.orderIngredients.findIndex(ingredient => ingredient._id === action.payload._id);
      state.orderIngredients.splice(indexSelectingIngredient, 1)
      state.orderCost = state.orderCost - action.payload.price;
      state.ingredientsID = state.ingredientsID.filter(ingredient => ingredient !== action.payload._id)
    },
    sortingIngredients: (state, action) => {

    }
  },
  extraReducers: {
    [placeAnOrder.pending]: (state, action) => {
      state.status = 'loading'
    },
    [placeAnOrder.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      console.log(action.payload)
      state.orderDetails.name = action.payload.name
      state.orderDetails.number = action.payload.order.number

    },
    [placeAnOrder.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const orderFetchStatus = state => state.orderSlice.status;
export const orderDetails = state => state.orderSlice.orderDetails;
export const orderIngredientsId = state => state.orderSlice.ingredientsID;
export const orderCost = state => state.orderSlice.orderCost;
export const orderIngredients = state => state.orderSlice.orderIngredients;
export const { addIngredient, deleteIngredient, sortingIngredients } = orderSlice.actions
export default orderSlice.reducer