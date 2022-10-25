const ResponseError = require("./response-error");
const StatusCode = require("./status-code");

class ApiError extends Error {
  static badRequest(message = "Invalid request") {
    return new ResponseError(message, StatusCode.BAD_REQUEST);
  }

  static internalServerError(message = "Internal server error") {
    return new ResponseError(message, StatusCode.INTERNAL_SERVER_ERROR);
  }

  static unauthorized(message = "Your not authorized to do this action") {
    return new ResponseError(message, StatusCode.UNAUTHORIZED);
  }

  static forbidden(message = "You do not have priviliges to perform this action") {
    return new ResponseError(message, StatusCode.FORBIDDEN);
  }

  static notFound(message = "URL not found") {
    return new ResponseError(message, StatusCode.NOT_FOUND);
  }

  static from(error) {
    error.status = error.status || StatusCode.INTERNAL_SERVER_ERROR;
    return new ResponseError(error.message, error.status);
  }
}

module.exports = ApiError;
