import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface BurgerConstructorState {
  bun: TIngredient | null;
  ingredients: TIngredient[];
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      state.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload
      );
    },
    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredientUp(state, action: PayloadAction<string>) {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient._id === action.payload
      );
      if (index > 0) {
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index - 1];
        state.ingredients[index - 1] = temp;
      }
    },
    moveIngredientDown(state, action: PayloadAction<string>) {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient._id === action.payload
      );
      if (index < state.ingredients.length - 1) {
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index + 1];
        state.ingredients[index + 1] = temp;
      }
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  resetConstructor,
  moveIngredientUp,
  moveIngredientDown
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
