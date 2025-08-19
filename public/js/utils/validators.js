// Validation rules object
export const validators = {
  required: (value) => (value ? undefined : 'This field is required'),
  email: (value) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
      ? undefined
      : 'Invalid email address',
  minLength: (min) => (value) =>
    value && value.length < min
      ? `Must be at least ${min} characters`
      : undefined,
  maxLength: (max) => (value) =>
    value && value.length > max
      ? `Must be ${max} characters or less`
      : undefined,
  number: (value) =>
    value && isNaN(Number(value)) ? 'Must be a number' : undefined,
  minValue: (min) => (value) =>
    value && value < min ? `Must be at least ${min}` : undefined,
  maxValue: (max) => (value) =>
    value && value > max ? `Must be less than ${max}` : undefined,
  match: (field, message) => (value, allValues) =>
    value === allValues[field] ? undefined : message || 'Fields must match',
  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value))
      return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(value))
      return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
    return undefined;
  },
  phone: (value) =>
    /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(value)
      ? undefined
      : 'Invalid phone number',
  url: (value) =>
    /^(ftp|http|https):\/\/[^ "]+$/.test(value)
      ? undefined
      : 'Invalid URL',
  creditCard: (value) =>
    /^[0-9]{13,19}$/.test(value.replace(/\s+/g, ''))
      ? undefined
      : 'Invalid credit card number',
  expiryDate: (value) => {
    if (!/^\d{2}\/\d{2}$/.test(value)) return 'Invalid format (MM/YY)';
    const [month, year] = value.split('/').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (month < 1 || month > 12) return 'Invalid month';
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Card expired';
    }
    return undefined;
  },
  cvv: (value) =>
    /^\d{3,4}$/.test(value) ? undefined : 'Invalid CVV',
};

// Compose multiple validators
export const composeValidators = (...validators) => (value, allValues) =>
  validators.reduce(
    (error, validator) => error || (validator && validator(value, allValues)),
    undefined
  );

// Validate form fields
export const validateForm = (values, validationRules) => {
  const errors = {};
  
  Object.keys(validationRules).forEach((field) => {
    const fieldValidators = validationRules[field];
    const value = values[field];
    
    if (Array.isArray(fieldValidators)) {
      const fieldError = fieldValidators
        .map((validator) => validator(value, values))
        .find((error) => error);
      
      if (fieldError) {
        errors[field] = fieldError;
      }
    } else if (typeof fieldValidators === 'function') {
      const fieldError = fieldValidators(value, values);
      if (fieldError) {
        errors[field] = fieldError;
      }
    }
  });
  
  return errors;
};

// Common validation rules
export const commonValidators = {
  email: [validators.required, validators.email],
  password: [validators.required, validators.password],
  name: [validators.required, validators.minLength(2)],
  phone: [validators.required, validators.phone],
  required: [validators.required],
};

// Example usage:
/*
const validationRules = {
  email: commonValidators.email,
  password: commonValidators.password,
  confirmPassword: [
    validators.required,
    validators.match('password', 'Passwords do not match'),
  ],
  firstName: commonValidators.name,
  lastName: commonValidators.name,
  phone: commonValidators.phone,
};

const errors = validateForm(formValues, validationRules);
*/
