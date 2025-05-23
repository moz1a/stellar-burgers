import { TIngredient } from '@utils-types';
import {
  fetchIngredients,
  reducer as ingredientsReducer,
  IngredientsState
} from './ingredientsSlice';

describe('тест ingredinetSlice', () => {
  const initialStateIngredinets: IngredientsState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  const mockIngredients: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ];

  test('тест пендинга ингредиентов', () => {
    const state = ingredientsReducer(
      initialStateIngredinets,
      fetchIngredients.pending('', undefined)
    );
    expect(state.isLoading).toBe(true);
  });

  test('тест успеха получения ингредиаентов и записи в стор', () => {
    const state = ingredientsReducer(
      initialStateIngredinets,
      fetchIngredients.fulfilled(mockIngredients, '', undefined)
    );
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.isLoading).toBe(false);
  });

  test('тест ошибки получения ингердиентов', () => {
    const action = fetchIngredients.rejected(
      new Error('Ошибка загрузки'),
      '',
      undefined
    );

    const state = ingredientsReducer(
      {
        ingredients: [],
        isLoading: true,
        error: null
      },
      action
    );
    expect(state.error).toBe('Ошибка загрузки');
    expect(state.isLoading).toBe(false);
  });
});
