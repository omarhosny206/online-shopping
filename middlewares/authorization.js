const jwt = require("../utils/jwt");
const userService = require("../services/user-service");
const ResponseError = require("../utils/response-error");
const StatusCode = require("../utils/status-code");

exports.authorizeToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
      throw ResponseError.of("Unauthorized: token not provided", StatusCode.UNAUTHORIZED);
    }

    const token = authorizationHeader.slice(7);
    const payload = await jwt.verify(token);
    const user = await userService.getByEmail(payload.email);
    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};

exports.authorizeRole = (allowedRoles) => async (req, res, next) => {
  try {
    const roles = await userService.getRoles(req.user.id);
    const intersectedRoles = roles.filter((role) => allowedRoles.includes(role));

    if (!intersectedRoles.length) {
      throw ResponseError.of("Unauthorized: your role is not authorized to view this resource", StatusCode.FORBIDDED);
    }

    next();
  } catch (error) {
    return next(error);
  }
};
