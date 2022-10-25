const jwt = require("../utils/jwt");
const userService = require("../services/user-service");
const ApiError = require("../utils/api-error");

exports.authorizeToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
      throw ApiError.unauthorized("Unauthorized: token not provided");
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
    const role = await userService.getRole(req.user.id);
    const isAuthorized = allowedRoles.includes(role);

    if (!isAuthorized) {
      throw ApiError.forbidden("Unauthorized: your role is not authorized to interact with this resource");
    }

    next();
  } catch (error) {
    return next(error);
  }
};
