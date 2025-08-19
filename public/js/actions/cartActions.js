import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from '../constants/cartConstants';

// Add item to cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.images && data.images.length > 0 ? data.images[0] : '/images/default-product.jpg',
        price: data.price,
        countInStock: data.countInStock,
        qty: Number(qty),
      },
    });

    // Save cart to localStorage
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.error('Error adding to cart:', error);
    // You might want to dispatch an error action here
    throw error; // Rethrow to handle in the component
  }
};

// Remove item from cart
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  // Update localStorage
  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cart.cartItems)
  );
};

// Save shipping address
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  // Save to localStorage
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

// Save payment method
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  // Save to localStorage
  localStorage.setItem('paymentMethod', JSON.stringify(data));
};

// Clear cart items
export const clearCart = () => (dispatch) => {
  dispatch({ type: CART_CLEAR_ITEMS });
  localStorage.removeItem('cartItems');
};

// Load cart from localStorage
export const loadCartFromStorage = () => (dispatch) => {
  try {
    const cartItems = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [];

    const shippingAddress = localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {};

    const paymentMethod = localStorage.getItem('paymentMethod')
      ? JSON.parse(localStorage.getItem('paymentMethod'))
      : '';

    // Dispatch actions to update Redux store
    if (cartItems.length > 0) {
      dispatch({
        type: CART_ADD_ITEM,
        payload: cartItems,
      });
    }

    if (Object.keys(shippingAddress).length > 0) {
      dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: shippingAddress,
      });
    }

    if (paymentMethod) {
      dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: paymentMethod,
      });
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
};
