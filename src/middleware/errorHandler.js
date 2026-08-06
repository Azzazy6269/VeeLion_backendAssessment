const HttpError = require('../utils/httpError');

function errorHandler(error, req, res, next) {
  const isOperational = error.isOperational;
  const isDev = process.env.NODE_ENV === 'development';
  const isOperationalOrDev = isOperational || isDev;
  const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 500;

  if (isDev || statusCode >= 500) {
    console.error(error);
  }

  if (res.headersSent) {
    return next(error);
  }
  
  const message = isOperationalOrDev ?  error.message : 'Internal server error';

  const response = {
    error: {
      message,
    },
  };


  if (isOperationalOrDev && error.details) {
    response.error.details = error.details;
  }

  if(isDev){
    response.error.stack = error.stack
  }

  return res.status(statusCode).json(response);
}

module.exports = errorHandler;
