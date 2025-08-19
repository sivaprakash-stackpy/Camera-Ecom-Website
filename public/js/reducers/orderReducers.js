import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Actions
export const createOrder = createAsyncThunk(
  'order/create',
  async (order, { getState, rejectWithValue }) => {
    try {
      const { userLogin } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.post('/api/orders', order, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error creating order'
      );
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  'order/details',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { userLogin } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error fetching order details'
      );
    }
  }
);

export const payOrder = createAsyncThunk(
  'order/pay',
  async ({ orderId, paymentResult }, { getState, rejectWithValue }) => {
    try {
      const { userLogin } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error processing payment'
      );
    }
  }
);

// Slices
const orderCreateSlice = createSlice({
  name: 'orderCreate',
  initialState: { order: {}, loading: false, error: null, success: false },
  reducers: {
    resetOrderCreate: (state) => {
      state.order = {};
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: { order: { orderItems: [], shippingAddress: {} }, loading: true, error: null },
  reducers: {
    resetOrderDetails: (state) => {
      state.order = { orderItems: [], shippingAddress: {} };
      state.loading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const orderPaySlice = createSlice({
  name: 'orderPay',
  initialState: { loading: false, success: false, error: null },
  reducers: {
    resetOrderPay: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(payOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { resetOrderCreate } = orderCreateSlice.actions;
export const { resetOrderDetails } = orderDetailsSlice.actions;
export const { resetOrderPay } = orderPaySlice.actions;

// Export reducers
export const orderCreateReducer = orderCreateSlice.reducer;
export const orderDetailsReducer = orderDetailsSlice.reducer;
export const orderPayReducer = orderPaySlice.reducer;

// Other order-related reducers
export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case 'ORDER_LIST_MY_REQUEST':
      return { loading: true };
    case 'ORDER_LIST_MY_SUCCESS':
      return { loading: false, orders: action.payload };
    case 'ORDER_LIST_MY_FAIL':
      return { loading: false, error: action.payload };
    case 'ORDER_LIST_MY_RESET':
      return { orders: [] };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case 'ORDER_LIST_REQUEST':
      return { loading: true };
    case 'ORDER_LIST_SUCCESS':
      return { loading: false, orders: action.payload };
    case 'ORDER_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_DELIVER_REQUEST':
      return { loading: true };
    case 'ORDER_DELIVER_SUCCESS':
      return { loading: false, success: true };
    case 'ORDER_DELIVER_FAIL':
      return { loading: false, error: action.payload };
    case 'ORDER_DELIVER_RESET':
      return {};
    default:
      return state;
  }
};
