import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Message = ({ 
  children, 
  variant = 'info', 
  className = '', 
  onDismiss,
  dismissable = true
}) => {
  // Define variant styles
  const variants = {
    success: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      border: 'border-green-200',
      icon: <FaCheckCircle className="h-5 w-5 text-green-400" />
    },
    error: {
      bg: 'bg-red-50',
      text: 'text-red-800',
      border: 'border-red-200',
      icon: <FaExclamationCircle className="h-5 w-5 text-red-400" />
    },
    warning: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-800',
      border: 'border-yellow-200',
      icon: <FaExclamationCircle className="h-5 w-5 text-yellow-400" />
    },
    info: {
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-200',
      icon: <FaInfoCircle className="h-5 w-5 text-blue-400" />
    }
  };

  const currentVariant = variants[variant] || variants.info;

  return (
    <div 
      className={`rounded-md p-4 mb-4 ${currentVariant.bg} ${currentVariant.border} border ${className}`}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {currentVariant.icon}
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${currentVariant.text}`}>
            {children}
          </p>
        </div>
        {dismissable && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className={`inline-flex rounded-md p-1.5 ${currentVariant.text} hover:bg-opacity-20 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-current`}
                aria-label="Dismiss"
              >
                <span className="sr-only">Dismiss</span>
                <FaTimes className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper components for common message types
export const SuccessMessage = (props) => <Message variant="success" {...props} />;
export const ErrorMessage = (props) => <Message variant="error" {...props} />;
export const WarningMessage = (props) => <Message variant="warning" {...props} />;
export const InfoMessage = (props) => <Message variant="info" {...props} />;

export default Message;
