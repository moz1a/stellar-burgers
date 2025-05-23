import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as ingredientsReducer } from './slices/ingredientsSlice';
import { reducer as ordersReducer } from './slices/ordersSlice';
import { reducer as profileReducer } from './slices/profileSlice';
import burgerConstructorSlice from './slices/constructorSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  profile: profileReducer,
  burgerConstructor: burgerConstructorSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
