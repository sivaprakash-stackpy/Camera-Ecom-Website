// Safely get item from localStorage
export const getLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Safely set item in localStorage
export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting ${key} in localStorage:`, error);
    return false;
  }
};

// Safely remove item from localStorage
export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};

// Clear all items from localStorage (except those in the exceptions array)
export const clearLocalStorage = (exceptions = []) => {
  try {
    if (exceptions.length === 0) {
      localStorage.clear();
      return true;
    }

    // Save the items we want to keep
    const keepItems = {};
    exceptions.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value !== null) {
        keepItems[key] = value;
      }
    });

    // Clear everything
    localStorage.clear();

    // Restore the items we want to keep
    Object.entries(keepItems).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });

    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const userInfo = getLocalStorage('userInfo');
  return !!(userInfo && userInfo.token);
};

// Get user info from localStorage
export const getUserInfo = () => {
  return getLocalStorage('userInfo', {});
};

// Get cart items from localStorage
export const getCartItems = () => {
  return getLocalStorage('cartItems', []);
};

// Save cart items to localStorage
export const saveCartItems = (cartItems) => {
  return setLocalStorage('cartItems', cartItems);
};

// Get shipping address from localStorage
export const getShippingAddress = () => {
  return getLocalStorage('shippingAddress', {});
};

// Save shipping address to localStorage
export const saveShippingAddress = (address) => {
  return setLocalStorage('shippingAddress', address);
};

// Get payment method from localStorage
export const getPaymentMethod = () => {
  return getLocalStorage('paymentMethod', '');
};

// Save payment method to localStorage
export const savePaymentMethod = (method) => {
  return setLocalStorage('paymentMethod', method);
};

// Clear user session (on logout)
export const clearUserSession = () => {
  removeLocalStorage('userInfo');
  removeLocalStorage('shippingAddress');
  removeLocalStorage('paymentMethod');
  // Keep cart items after logout
  // removeLocalStorage('cartItems');
};

// Get auth token
export const getAuthToken = () => {
  const userInfo = getLocalStorage('userInfo');
  return userInfo?.token || null;
};

// Check if user is admin
export const isAdmin = () => {
  const userInfo = getLocalStorage('userInfo');
  return userInfo?.role === 'admin';
};

// Set auth headers for axios
export const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};
