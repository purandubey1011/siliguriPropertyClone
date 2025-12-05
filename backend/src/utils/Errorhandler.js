class ErrorHandler extends Error {
  constructor(message, statusCode = 500, success = false) {
    super(message);
    this.statusCode = statusCode;
    this.success = success;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
