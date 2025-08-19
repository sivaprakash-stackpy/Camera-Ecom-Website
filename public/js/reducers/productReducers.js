import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Actions
const listProducts = createAsyncThunk(
  'productList/listProducts',
  async ({ keyword = '', pageNumber = '' }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error fetching products'
      );
    }
  }
);

const listProductDetails = createAsyncThunk(
  'productDetails/listProductDetails',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Product not found'
      );
    }
  }
);

// Slices
const productListSlice = createSlice({
  name: 'productList',
  initialState: { products: [], loading: true, error: null, page: 1, pages: 1 },
  reducers: {
    resetProductList: (state) => {
      state.products = [];
      state.loading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: { product: { reviews: [] }, loading: true, error: null },
  reducers: {
    resetProductDetails: (state) => {
      state.product = { reviews: [] };
      state.loading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(listProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(listProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
const { resetProductList } = productListSlice.actions;
const { resetProductDetails } = productDetailsSlice.actions;

export {
  listProducts,
  listProductDetails,
  resetProductList,
  resetProductDetails,
};

export const productListReducer = productListSlice.reducer;
export const productDetailsReducer = productDetailsSlice.reducer;

// Other reducers (simplified for brevity)
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_DELETE_REQUEST':
      return { loading: true };
    case 'PRODUCT_DELETE_SUCCESS':
      return { loading: false, success: true };
    case 'PRODUCT_DELETE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_CREATE_REQUEST':
      return { loading: true };
    case 'PRODUCT_CREATE_SUCCESS':
      return { loading: false, success: true, product: action.payload };
    case 'PRODUCT_CREATE_FAIL':
      return { loading: false, error: action.payload };
    case 'PRODUCT_CREATE_RESET':
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case 'PRODUCT_UPDATE_REQUEST':
      return { loading: true };
    case 'PRODUCT_UPDATE_SUCCESS':
      return { loading: false, success: true, product: action.payload };
    case 'PRODUCT_UPDATE_FAIL':
      return { loading: false, error: action.payload };
    case 'PRODUCT_UPDATE_RESET':
      return { product: {} };
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_CREATE_REVIEW_REQUEST':
      return { loading: true };
    case 'PRODUCT_CREATE_REVIEW_SUCCESS':
      return { loading: false, success: true };
    case 'PRODUCT_CREATE_REVIEW_FAIL':
      return { loading: false, error: action.payload };
    case 'PRODUCT_CREATE_REVIEW_RESET':
      return {};
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case 'PRODUCT_TOP_REQUEST':
      return { loading: true, products: [] };
    case 'PRODUCT_TOP_SUCCESS':
      return { loading: false, products: action.payload };
    case 'PRODUCT_TOP_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
