const userService = require("../services/user-service");
const ApiError = require("../utils/api-error");

exports.authorizeByRole = (allowedRoles) => async (req, res, next) => {
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
