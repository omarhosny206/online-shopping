const StatusCode = require("./status-code");

class ResponseError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }

  static of(message, status) {
    return new ResponseError(message, status);
  }

  static from(error) {
    error.status = error.status || StatusCode.INTERNAL_SERVER_ERROR;
    return new ResponseError(error.message, error.status);
  }
}

module.exports = ResponseError;
