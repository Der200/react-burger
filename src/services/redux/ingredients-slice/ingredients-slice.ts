import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import TIngredientObject from '../../../utils/types';

const ingredientsApiUrl = 'https://norma.nomoreparties.space/api/ingredients';

type TFetchIngredientsResponse = {
  success: boolean;
  data: Array<TIngredientObject>;
}

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async (): Promise<TFetchIngredientsResponse | undefined> => {
  try {
    const res = await fetch(ingredientsApiUrl);
    
    if(!res.ok) {
      throw new Error('сервер не смог обработать наш запрос')
    }
    const ingredients: TFetchIngredientsResponse = await res.json();

    return ingredients
            
  } catch(e: any) {
      alert(`Что-то пошло не так. Ошибка: ${e}`)
  }
})

type TIngredientState = {
  ingredientsData: Array<TIngredientObject>;
  selectedIngredientDetails: null | TIngredientObject;
  isShowIngredient: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: Readonly<TIngredientState> = {
  ingredientsData: [],
  selectedIngredientDetails: null,
  isShowIngredient: false,
  status: `idle`,
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredientDetails: (state, action: PayloadAction<TIngredientObject>) => {
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
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.status = 'succeeded';
      if (state.ingredientsData.length === 0 && action.payload !== undefined) {
        state.ingredientsData = state.ingredientsData.concat(action.payload.data);
      }
      
    })
    builder.addCase(fetchIngredients.rejected, (state) => {
      state.status = 'failed';
    })
  },
})

export const ingredientsFetchStatus = state => state.ingredientsSlice.status;
export const fetchedIngredients = state => state.ingredientsSlice.ingredientsData;
export const selectedIngredient = state => state.ingredientsSlice.selectedIngredientDetails;
export const modalViewIngredient = state => state.ingredientsSlice.isShowIngredient;
export const { setIngredientDetails, showIngredientDetails, closeIngredientDetails } = ingredientsSlice.actions
export default ingredientsSlice.reducer