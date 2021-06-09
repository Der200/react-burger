import { combineReducers } from "redux";
import ingredientsSlice from "./ingredients-slice";
import orderSlice from "./order-slice";
import authorizationSlice from "./authorization-slice";

const rootReducer = combineReducers({
  ingredientsSlice: ingredientsSlice,
  orderSlice: orderSlice,
  authorizationSlice: authorizationSlice,
})

export default rootReducer