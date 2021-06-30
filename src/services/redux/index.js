import { combineReducers } from "redux";
import ingredientsSlice from "./ingredients-slice/ingredients-slice";
import orderSlice from "./order-slice/order-slice";
import authorizationSlice from "./authorization-slice/authorization-slice";
import wsSlice from "./ws-slice/ws-slice";

const rootReducer = combineReducers({
  wsSlice: wsSlice,
  ingredientsSlice: ingredientsSlice,
  orderSlice: orderSlice,
  authorizationSlice: authorizationSlice,
})

export default rootReducer