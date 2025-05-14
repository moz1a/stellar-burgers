import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type OrdersState = {
  orders: Array<TOrder>;
  newOrder: TOrder | null;
  currentOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
  sendingOrder: boolean;
};

const initialState: OrdersState = {
  orders: [],
  newOrder: null,
  currentOrder: null,
  isLoading: false,
  error: null,
  sendingOrder: false
};

export const fetchOrders = createAsyncThunk('orders/getAll', async () => {
  try {
    const orders = await getOrdersApi();
    return orders;
  } catch (error: any) {
    throw error.message;
  }
});

export const fetchOrderByNumber = createAsyncThunk(
  'orders/getByNumber',
  async (number: number) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response.orders[0];
    } catch (error: any) {
      throw error.message;
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (ingredientIds: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredientIds);
      return response.order;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {
    deleteOrder: (state) => {
      state.newOrder = null;
      state.orders = [];
    }
  },
  selectors: {
    getOrders: (state) => state.orders,
    getCurrentOrder: (state) => state.currentOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка при загрузке заказов';
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.currentOrder = null;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.isLoading = false;
          state.currentOrder = action.payload;
        }
      )
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка при загрузке заказа';
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.sendingOrder = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sendingOrder = false;
        state.newOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.sendingOrder = false;
        state.error = action.payload as string;
      });
  }
});

export const reducer = ordersSlice.reducer;
export const { deleteOrder } = ordersSlice.actions;
export const { getOrders, getCurrentOrder } = ordersSlice.selectors;
