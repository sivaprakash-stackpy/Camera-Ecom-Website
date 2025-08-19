import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loader = ({ size = 24, color = 'text-blue-500', className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <FaSpinner 
        className={`animate-spin ${color}`} 
        size={size} 
        aria-label="Loading..."
      />
    </div>
  );
};

export const ButtonLoader = ({ size = 16, color = 'text-white' }) => (
  <span className="flex items-center">
    <FaSpinner 
      className={`animate-spin ${color} mr-2`} 
      size={size} 
      aria-hidden="true"
    />
    Processing...
  </span>
);

export const PageLoader = () => (
  <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
    <div className="text-center">
      <FaSpinner className="animate-spin text-blue-500 mx-auto" size={48} />
      <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
    </div>
  </div>
);

export const ContentLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);

export const ImageLoader = ({ className = '' }) => (
  <div className={`bg-gray-200 animate-pulse ${className}`}></div>
);

export default Loader;
