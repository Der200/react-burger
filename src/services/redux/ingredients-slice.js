import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const ingredientsApiUrl = 'https://norma.nomoreparties.space/api/ingredients';

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
  try {
    const res = await fetch(ingredientsApiUrl);
    
    if(!res.ok) {
      throw new Error('сервер не смог обработать наш запрос')
    }
    const ingredients = await res.json();

    return ingredients.data
            
  } catch(e) {
      alert(`Что-то пошло не так. Ошибка: ${e}`)
  }
})

const initialState = {
  ingredientsData: [],
  selectedIngredientDetails: null,
  isShowIngredient: false,
  status: `idle`,
  error: null,
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredientDetails: (state, action) => {
      state.selectedIngredientDetails = action.payload;      
    },
    showIngredientDetails: state => {
      state.isShowIngredient = true;
    },
    closeIngredientDetails: state => {
      state.isShowIngredient = false;
      state.selectedIngredientDetails = null;
    }
  },
  extraReducers: {
    [fetchIngredients.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchIngredients.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      if (state.ingredientsData.length === 0) {
        state.ingredientsData = state.ingredientsData.concat(action.payload);
      }
      
    },
    [fetchIngredients.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
})

export const ingredientsFetchStatus = state => state.ingredientsSlice.status;
export const fetchedIngredients = state => state.ingredientsSlice.ingredientsData;
export const selectedIngredient = state => state.ingredientsSlice.selectedIngredientDetails;
export const modalViewIngredient = state => state.ingredientsSlice.isShowIngredient;
export const { setIngredientDetails, showIngredientDetails, closeIngredientDetails } = ingredientsSlice.actions
export default ingredientsSlice.reducer