import axios from './axiosConfig';
import { getAuthToken } from './storage';

// API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Common headers for API requests
const getHeaders = (contentType = 'application/json') => {
  const headers = {
    'Content-Type': contentType,
  };

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

// Handle API response
export const handleResponse = async (response) => {
  const data = await response.data;
  if (response.status >= 200 && response.status < 300) {
    return data;
  }
  throw new Error(data.message || 'Something went wrong');
};

// Handle API error
export const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const message =
      error.response.data?.message ||
      error.response.statusText ||
      'An error occurred';
    throw new Error(message);
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('No response from server. Please check your connection.');
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error(error.message || 'An error occurred');
  }
};

// API methods
export const api = {
  // GET request
  get: async (endpoint, params = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
        params,
        headers: getHeaders(),
      });
      return handleResponse({ data: response.data, status: response.status });
    } catch (error) {
      return handleError(error);
    }
  },

  // POST request
  post: async (endpoint, data = {}, contentType = 'application/json') => {
    try {
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
        headers: getHeaders(contentType),
      });
      return handleResponse({ data: response.data, status: response.status });
    } catch (error) {
      return handleError(error);
    }
  },

  // PUT request
  put: async (endpoint, data = {}, contentType = 'application/json') => {
    try {
      const response = await axios.put(`${API_BASE_URL}${endpoint}`, data, {
        headers: getHeaders(contentType),
      });
      return handleResponse({ data: response.data, status: response.status });
    } catch (error) {
      return handleError(error);
    }
  },

  // PATCH request
  patch: async (endpoint, data = {}) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}${endpoint}`, data, {
        headers: getHeaders(),
      });
      return handleResponse({ data: response.data, status: response.status });
    } catch (error) {
      return handleError(error);
    }
  },

  // DELETE request
  delete: async (endpoint) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}${endpoint}`, {
        headers: getHeaders(),
      });
      return handleResponse({ data: response.data, status: response.status });
    } catch (error) {
      return handleError(error);
    }
  },

  // File upload
  upload: async (endpoint, file, fieldName = 'file', onUploadProgress) => {
    const formData = new FormData();
    formData.append(fieldName, file);

    try {
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, formData, {
        headers: {
          ...getHeaders('multipart/form-data'),
        },
        onUploadProgress,
      });
      return handleResponse({ data: response.data, status: response.status });
    } catch (error) {
      return handleError(error);
    }
  },
};

// Auth API
export const authAPI = {
  login: (email, password) =>
    api.post('/users/login', { email, password }),
  
  register: (userData) =>
    api.post('/users/register', userData),
  
  getProfile: () =>
    api.get('/users/profile'),
  
  updateProfile: (userData) =>
    api.put('/users/profile', userData),
};

// Products API
export const productsAPI = {
  getProducts: (params = {}) =>
    api.get('/products', params),
  
  getProduct: (id) =>
    api.get(`/products/${id}`),
  
  createProduct: (productData) =>
    api.post('/products', productData),
  
  updateProduct: (id, productData) =>
    api.put(`/products/${id}`, productData),
  
  deleteProduct: (id) =>
    api.delete(`/products/${id}`),
  
  createReview: (productId, reviewData) =>
    api.post(`/products/${productId}/reviews`, reviewData),
  
  getTopProducts: () =>
    api.get('/products/top'),
};

// Orders API
export const ordersAPI = {
  createOrder: (orderData) =>
    api.post('/orders', orderData),
  
  getOrder: (id) =>
    api.get(`/orders/${id}`),
  
  payOrder: (orderId, paymentResult) =>
    api.put(`/orders/${orderId}/pay`, paymentResult),
  
  deliverOrder: (orderId) =>
    api.put(`/orders/${orderId}/deliver`),
  
  getMyOrders: () =>
    api.get('/orders/myorders'),
  
  getAllOrders: () =>
    api.get('/orders'),
};

// Users API
export const usersAPI = {
  getUsers: () =>
    api.get('/users'),
  
  getUser: (id) =>
    api.get(`/users/${id}`),
  
  updateUser: (id, userData) =>
    api.put(`/users/${id}`, userData),
  
  deleteUser: (id) =>
    api.delete(`/users/${id}`),
};

export default api;
