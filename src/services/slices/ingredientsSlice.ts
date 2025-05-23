import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type IngredientsState = {
  ingredients: Array<TIngredient>;
  isLoading: boolean;
  error: string | null;
};

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => {
    const responce = await getIngredientsApi();
    return responce;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientById: (state, id: string) =>
      state.ingredients.find((ingredient) => ingredient._id === id),
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isLoading = false;
          state.ingredients = action.payload;
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ?? 'Ошибка при загрузке ингредиентов';
      });
  }
});

export const reducer = ingredientsSlice.reducer;
export const { getIngredients, getIngredientById, selectIsLoading } =
  ingredientsSlice.selectors;
