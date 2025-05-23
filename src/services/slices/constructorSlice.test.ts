import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  BurgerConstructorState
} from './constructorSlice';

describe('тест constructorSlice', () => {
  const initialConstructorState: BurgerConstructorState = {
    bun: null,
    ingredients: []
  };

  test('тест добавления ингредиента', () => {
    const newState = burgerConstructorReducer(
      initialConstructorState,
      addIngredient({
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      })
    );

    const { ingredients } = newState;

    expect(ingredients).toEqual([
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
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ]);
  });

  test('тест удаления ингредиента', () => {
    const stateWithIngredient = burgerConstructorReducer(
      initialConstructorState,
      addIngredient({
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      })
    );

    const newState = burgerConstructorReducer(
      stateWithIngredient,
      removeIngredient('643d69a5c3f7b9001cfa0941')
    );

    const { ingredients } = newState;

    expect(ingredients).toEqual([]);
  });

  test('тест изменения порядка ингредиента', () => {
    const stateWithOneIngredient = burgerConstructorReducer(
      initialConstructorState,
      addIngredient({
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      })
    );
    const stateWithTwoIngredients = burgerConstructorReducer(
      stateWithOneIngredient,
      addIngredient({
        _id: '643d69a5c3f7b9001cfa093f',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
      })
    );

    const stateWithChangedIndexIngredient = burgerConstructorReducer(
      stateWithTwoIngredients,
      moveIngredientUp('643d69a5c3f7b9001cfa093f')
    );

    const firstIngredient = stateWithChangedIndexIngredient.ingredients[0];

    expect(firstIngredient).toEqual({
      _id: '643d69a5c3f7b9001cfa093f',
      name: 'Мясо бессмертных моллюсков Protostomia',
      type: 'main',
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
    });
  });
});
