import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Actions
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Invalid email or password'
      );
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error creating user'
      );
    }
  }
);

export const getUserDetails = createAsyncThunk(
  'user/details',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { userLogin } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.get('/api/users/profile', config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error fetching user details'
      );
    }
  }
);

// Slices
const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
    resetUserLogin: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetUserRegister: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    user: {},
    loading: false,
    error: null,
  },
  reducers: {
    resetUserDetails: (state) => {
      state.user = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { logout, resetUserLogin } = userLoginSlice.actions;
export const { resetUserRegister } = userRegisterSlice.actions;
export const { resetUserDetails } = userDetailsSlice.actions;

// Export reducers
export const userLoginReducer = userLoginSlice.reducer;
export const userRegisterReducer = userRegisterSlice.reducer;
export const userDetailsReducer = userDetailsSlice.reducer;

// Other user-related reducers
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_UPDATE_PROFILE_REQUEST':
      return { loading: true };
    case 'USER_UPDATE_PROFILE_SUCCESS':
      return { loading: false, success: true, userInfo: action.payload };
    case 'USER_UPDATE_PROFILE_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_UPDATE_PROFILE_RESET':
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case 'USER_LIST_REQUEST':
      return { loading: true };
    case 'USER_LIST_SUCCESS':
      return { loading: false, users: action.payload };
    case 'USER_LIST_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_LIST_RESET':
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_DELETE_REQUEST':
      return { loading: true };
    case 'USER_DELETE_SUCCESS':
      return { loading: false, success: true };
    case 'USER_DELETE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case 'USER_UPDATE_REQUEST':
      return { loading: true };
    case 'USER_UPDATE_SUCCESS':
      return { loading: false, success: true };
    case 'USER_UPDATE_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_UPDATE_RESET':
      return { user: {} };
    default:
      return state;
  }
};
