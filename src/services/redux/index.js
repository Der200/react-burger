import { combineReducers } from "redux";
import ingredientsSlice from "./ingredients-slice";
import orderSlice from "./order-slice";

const rootReducer = combineReducers({
  ingredientsSlice: ingredientsSlice,
  orderSlice: orderSlice,
})

export default rootReducer