import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import {
  getIngredientById,
  selectIsLoading
} from '../../services/slices/ingredientsSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>();
  const isLoading = useSelector<RootState, boolean>(selectIsLoading);

  const ingredientData = useSelector((state: RootState) =>
    getIngredientById(state, id!)
  );

  if (isLoading || !ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
