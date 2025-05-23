import { reducer as profileReducer } from './profileSlice';
import { checkAuth, updateUser, logout } from './profileSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

const initialState = {
  user: null,
  isAuthentificated: false,
  isLoading: false,
  error: null
};

describe('тест profileSlice', () => {
  test('checkAuth.pending sets isLoading to true', () => {
    const action = checkAuth.pending('', undefined);
    const state = profileReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  test('тест успешной проверки авторизации', () => {
    const action = checkAuth.fulfilled(mockUser, '', undefined);
    const state = profileReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthentificated).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  test('тест проверки авторизации с ошибкой', () => {
    const action = checkAuth.rejected(new Error(), '', undefined);
    const state = profileReducer(
      { ...initialState, isAuthentificated: true },
      action
    );
    expect(state.isLoading).toBe(false);
    expect(state.isAuthentificated).toBe(false);
  });

  test('тест пендинга обновления юзера', () => {
    const action = updateUser.pending('', {});
    const state = profileReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  test('тест успешного обновления юзера', () => {
    const action = updateUser.fulfilled(mockUser, '', {});
    const state = profileReducer({ ...initialState, user: mockUser }, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
  });

  test('тест обновления юзера с ошибкой', () => {
    const action = updateUser.rejected(new Error(), '', {});
    const state = profileReducer({ ...initialState, isLoading: true }, action);
    expect(state.isLoading).toBe(false);
  });

  test('тест пендинга выхода', () => {
    const action = logout.pending('', undefined);
    const state = profileReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  test('тест успешного выхода', () => {
    const action = logout.fulfilled(undefined, '', undefined);
    const state = profileReducer(
      {
        ...initialState,
        user: mockUser,
        isAuthentificated: true
      },
      action
    );
    expect(state.user).toBeNull();
    expect(state.isAuthentificated).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  test('тест ошибки выхода', () => {
    const action = logout.rejected(new Error(), '', undefined, 'Ошибка выхода');
    const state = profileReducer(initialState, action);
    expect(state.error).toBe('Ошибка выхода');
    expect(state.isLoading).toBe(false);
  });
});
