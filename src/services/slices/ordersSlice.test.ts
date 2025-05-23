import { reducer as ordersReducer } from './ordersSlice';
import { fetchOrders, fetchOrderByNumber, createOrder } from './ordersSlice';
import { TOrder } from '@utils-types';

const initialState = {
  orders: [],
  newOrder: null,
  currentOrder: null,
  isLoading: false,
  error: null,
  sendingOrder: false
};

describe('тест ordersSlice', () => {
  const mockOrders: TOrder[] = [
    {
      _id: '1',
      number: 111,
      name: 'Order 1',
      ingredients: [],
      status: 'done',
      createdAt: '',
      updatedAt: ''
    },
    {
      _id: '2',
      number: 222,
      name: 'Order 2',
      ingredients: [],
      status: 'pending',
      createdAt: '',
      updatedAt: ''
    }
  ];

  const mockOrder: TOrder = {
    _id: '1',
    number: 123,
    name: 'Test Order',
    ingredients: [],
    status: 'done',
    createdAt: '',
    updatedAt: ''
  };

  test('тест пендинга заказов', () => {
    const action = fetchOrders.pending('', undefined);
    const state = ordersReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  test('тест успешного получения заказов', () => {
    const action = fetchOrders.fulfilled(mockOrders, '', undefined);
    const state = ordersReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  test('тест ошибки получения заказов', () => {
    const action = fetchOrders.rejected(
      new Error('Failed to fetch'),
      '',
      undefined
    );
    const state = ordersReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Failed to fetch');
  });

  test('тест пендинга заказа по номеру', () => {
    const startState = { ...initialState, currentOrder: mockOrder };
    const action = fetchOrderByNumber.pending('', 123);
    const state = ordersReducer(startState, action);
    expect(state.isLoading).toBe(true);
    expect(state.currentOrder).toBeNull();
  });

  test('тест успешного получения заказа по номеру', () => {
    const action = fetchOrderByNumber.fulfilled(mockOrder, '', 123);
    const state = ordersReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.currentOrder).toEqual(mockOrder);
  });

  test('тест ошибки получения заказа по номеру', () => {
    const action = fetchOrderByNumber.rejected(
      new Error('Order not found'),
      '',
      123
    );
    const state = ordersReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Order not found');
  });

  test('тест пендинга создания заказа', () => {
    const action = createOrder.pending('', ['123']);
    const state = ordersReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.sendingOrder).toBe(true);
    expect(state.error).toBeNull();
  });

  test('тест успешного создания заказа', () => {
    const action = createOrder.fulfilled(mockOrder, '', ['123']);
    const state = ordersReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.sendingOrder).toBe(false);
    expect(state.newOrder).toEqual(mockOrder);
  });

  test('тест создания заказа с ошибкой', () => {
    const action = createOrder.rejected(
      new Error(),
      '',
      ['123'],
      'Ошибка создания заказа'
    );
    const state = ordersReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.sendingOrder).toBe(false);
    expect(state.error).toBe('Ошибка создания заказа');
  });
});
