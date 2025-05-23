import store from './store';

describe('тест инициализации rootReducer', () => {
  test('проверка нужных свойств', () => {
    const rootState = store.getState();

    expect(rootState).toHaveProperty('ingredients');
    expect(rootState).toHaveProperty('orders');
    expect(rootState).toHaveProperty('profile');
    expect(rootState).toHaveProperty('burgerConstructor');
  });
});
