const { exec } = require('child_process');
const path = require('path');

// Log environment variables (except sensitive ones)
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI ? '***MongoDB URI is set***' : 'MongoDB URI is not set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '***JWT secret is set***' : 'JWT secret is not set');

// Start the server
const server = require('./server');
const PORT = process.env.PORT || 5000;

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
