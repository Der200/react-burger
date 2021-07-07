import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import TIngredientObject, { TOrderObject, TWsOrderObject } from '../../../utils/types';
import { getCookie } from '../authorization-slice/authorization-slice';

const orderApiUrl = 'https://norma.nomoreparties.space/api/orders';

type TPlaceAnOrderRequest = {
  ingredients: string[];
}

type TPlaceAnOrderResponse = {
  name: string;
  order: TWsOrderObject;
  success: boolean;
}

export const placeAnOrder = createAsyncThunk('order/placeAnOrder', async (order: TPlaceAnOrderRequest): Promise<TPlaceAnOrderResponse | undefined> => {
  try {
    const res = await fetch(orderApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getCookie('accessToken'),
      },
      body: JSON.stringify({ 
        "ingredients": order
      })
    });
    
    if(!res.ok) {
      throw new Error('сервер не смог обработать наш запрос')
    }

    const orderData: TPlaceAnOrderResponse = await res.json();
    return orderData
        
  } catch(e: any) {
    alert(`Что-то пошло не так. Ошибка: ${e}`)
  }
})

type TGetOrderDataRequest = {
  number: number;
}

type TGetOrderDataResponse = {
  success: boolean;
  orders: Array<TWsOrderObject>;
}

export const getOrderData = createAsyncThunk('order/getOrderData', async (number: TGetOrderDataRequest): Promise<TGetOrderDataResponse | undefined> => {
  try {
    const res = await fetch(`${orderApiUrl}/${number}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if(!res.ok) {
      throw new Error('сервер не смог обработать наш запрос')
    }

    const orderData: TGetOrderDataResponse = await res.json();
    return orderData
        
  } catch(e: any) {
    alert(`Что-то пошло не так. Ошибка: ${e}`)
  }
})

type TOrderSliceState = {
  orderIngredients: Array<TIngredientObject>;
  mainIngredients: Array<TIngredientObject>;
  bunIngredient: Array<TIngredientObject>;
  feedOrders: Array<TOrderObject>;
  ingredientsID: string[];
  orderCost: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  orderDetails: {name: string, number: string | number};
  isShowOrder: boolean;
  isShowOrderDetails: boolean;
  currentOrder: null | TOrderObject | undefined;
  orderStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  orderData: Array<TWsOrderObject>;
}

const initialState: Readonly<TOrderSliceState> = {
  orderIngredients: [],
  mainIngredients: [],
  bunIngredient: [],
  feedOrders: [],
  ingredientsID: [],
  orderCost: 0,
  status: `idle`,
  orderDetails: {
    name: '',
    number: '',
  },
  isShowOrder: false,
  isShowOrderDetails: false,
  currentOrder: null,
  orderStatus: `idle`,
  orderData: [],
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredientObject>) => {
      if(action.payload.type === 'bun' && state.bunIngredient.length) {
        state.orderCost = state.orderCost - (state.bunIngredient[0].price * 2) + (action.payload.price * 2);
        state.ingredientsID = state.ingredientsID.filter(ingredient => ingredient !== state.bunIngredient[0]._id);
        state.ingredientsID = [...state.ingredientsID, action.payload._id];
        state.bunIngredient = [action.payload];
      } else if (action.payload.type === 'bun') {
        state.ingredientsID = [...state.ingredientsID, action.payload._id];
        state.bunIngredient = [action.payload];
        state.orderCost += (action.payload.price * 2);
      } else {
        state.ingredientsID = [...state.ingredientsID, action.payload._id];
        state.mainIngredients = state.mainIngredients.concat({...action.payload, key: (Math.random() * (200 - 10) + 10)});
        state.orderCost += action.payload.price;
      }
        state.orderIngredients = state.mainIngredients.concat(state.bunIngredient);
    },
    deleteIngredient: (state, action: PayloadAction<TIngredientObject>) => {
      const indexSelectingIngredient = state.mainIngredients.findIndex(ingredient => ingredient._id === action.payload._id);
      state.mainIngredients.splice(indexSelectingIngredient, 1);
      state.orderCost = state.orderCost - action.payload.price;
      state.ingredientsID = state.ingredientsID.filter(ingredient => ingredient !== action.payload._id);
      state.orderIngredients = state.mainIngredients.concat(state.bunIngredient);
    },
    sortingIngredients: (state, action: PayloadAction<{indexFrom: number | undefined, indexTo: number | undefined}>) => {
      const {indexFrom, indexTo} = action.payload;
      const newArray = [...state.mainIngredients];
      if (indexTo !== undefined && indexFrom !== undefined) {
        newArray.splice(indexTo, 0, newArray.splice(indexFrom, 1)[0]);
        state.mainIngredients = newArray;
      }

    },
    showOrder: state => {
      state.isShowOrder = true;
    },
    closeOrder: state => {
      state.isShowOrder = false;
      state.orderIngredients = [];
      state.mainIngredients = [];
      state.orderCost = 0;
      state.orderDetails = {
        name: '',
        number: '',
      };
    },
    showOrderDetails: state => {
      state.isShowOrderDetails = true;
    },
    setCurrentOrder: (state, action: PayloadAction<number>) => {
      state.currentOrder = state.feedOrders.find((order) => order.number === action.payload); 
    },
    setFeedOrders: (state, action: PayloadAction<Array<TOrderObject>>) => {
      state.feedOrders = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(placeAnOrder.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(placeAnOrder.fulfilled, (state, action) => {
      state.status = 'succeeded';
      if (action.payload !== undefined) {
        state.orderDetails.name = action.payload.name;
        state.orderDetails.number = action.payload.order.number;
      }
      state.ingredientsID = [];
      state.bunIngredient = [];
      state.mainIngredients = [];
    })
    builder.addCase(placeAnOrder.rejected, (state) => {
      state.status = 'failed';
    })
    builder.addCase(getOrderData.pending, (state) => {
      state.orderStatus = 'loading';
    })
    builder.addCase(getOrderData.fulfilled, (state, action) => {
      state.orderStatus = 'succeeded';
      if (action.payload !== undefined) {
        state.orderData = action.payload.orders;
      }
    })
    builder.addCase(getOrderData.rejected, (state) => {
      state.orderStatus = 'failed';
    })
  },
})

export const orderStatus = state => state.orderSlice.orderStatus;
export const orderData = state => state.orderSlice.orderData;
export const order = state => state.orderSlice.currentOrder;
export const orderFetchStatus = state => state.orderSlice.status;
export const orderDetails = state => state.orderSlice.orderDetails;
export const orderIngredientsId = state => state.orderSlice.ingredientsID;
export const orderCost = state => state.orderSlice.orderCost;
export const feedOrders = state => state.orderSlice.feedOrders;
export const orderIngredients = state => state.orderSlice.orderIngredients;
export const mainIngredients = state => state.orderSlice.mainIngredients;
export const modalViewOrder = state => state.orderSlice.isShowOrder;
export const { addIngredient, deleteIngredient, sortingIngredients, showOrder, closeOrder, setCurrentOrder, setFeedOrders } = orderSlice.actions
export default orderSlice.reducer