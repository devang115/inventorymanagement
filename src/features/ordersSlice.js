import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from '../services/orderService';

const initialState = {
  orders: [], // User's order history
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Get user ID from authentication state if needed
      const userId = getState().auth.user?.id;
      const orders = await orderService.getUserOrders(userId); 
      return orders;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (orderData, { rejectWithValue, getState }) => {
    try {
      // You might need to add userId to orderData
      const userId = getState().auth.user?.id;
      const newOrder = await orderService.placeOrder({ userId, ...orderData });
      return newOrder; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Add reducers for client-side state updates related to orders if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ... Add cases for placeOrder and other async actions
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload); // Optimistically update order history
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;