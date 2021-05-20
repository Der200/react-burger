import { combineReducers } from "redux";
import ingredientsSlice from "./ingredients-slice";
import modalSlice from "./modal-slice";
import orderSlice from "./order-slice";

const rootReducer = combineReducers({
  modalSlice: modalSlice,
  ingredientsSlice: ingredientsSlice,
  orderSlice: orderSlice,
})

export default rootReducer