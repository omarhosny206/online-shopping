const jwt = require("../utils/jwt");
const userService = require("../services/user-service");
const ApiError = require("../utils/api-error");

exports.authenticateByToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
      throw ApiError.unauthorized("Unauthorized: access token not provided");
    }

    const accessToken = authorizationHeader.slice(7);
    const payload = await jwt.verifyAccessToken(accessToken);
    const user = await userService.getByEmail(payload.email);

    if (!user) {
      throw ApiError.unauthorized("Unauthorized: user not found");
    }

    req.authenticatedUser = user;
    next();
  } catch (error) {
    return next(error);
  }
};
