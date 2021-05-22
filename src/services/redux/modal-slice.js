import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modalView',
  initialState: {
    isShowIngredient: false, 
    isShowOrder: false,
  },
  reducers: {
    showIngredient: state => {
      state.isShowIngredient = true;
    },
    showOrder: state => {
      state.isShowOrder = true;
    },
    closeWindows: state => {
      state.isShowIngredient = false;
      state.isShowOrder = false;
    }
  }
})
export const modalViewOrder = state => state.modalSlice.isShowOrder;
export const modalViewIngredient = state => state.modalSlice.isShowIngredient;
export const { showIngredient, showOrder, closeWindows } = modalSlice.actions
export default modalSlice.reducer