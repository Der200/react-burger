import { combineReducers } from "redux";
import ingredientsSlice from "./ingredients-slice/ingredients-slice";
import orderSlice from "./order-slice/order-slice";
import authorizationSlice from "./authorization-slice/authorization-slice";

const rootReducer = combineReducers({
  ingredientsSlice: ingredientsSlice,
  orderSlice: orderSlice,
  authorizationSlice: authorizationSlice,
})

export default rootReducer