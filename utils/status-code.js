const StatusCode = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDED: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
});

module.exports = StatusCode;
