// Format price with commas and 2 decimal places
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Format date to a readable string
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Truncate text to a specified length and add ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

// Generate a unique ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Validate email format
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Format credit card number (e.g., 4242 4242 4242 4242)
export const formatCreditCard = (number) => {
  return number.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
};

// Format expiration date (e.g., 12/25)
export const formatExpiryDate = (date) => {
  return date.replace(/\D/g, '').replace(/(\d{2})(?=\d{2})/, '$1/');
};

// Calculate total price of cart items
export const calculateTotal = (items) => {
  return items.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
};

// Generate a random color (useful for placeholders)
export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
