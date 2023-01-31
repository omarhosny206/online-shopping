const ApiError = require("../utils/api-error");
const jwt = require("../utils/jwt");
const userService = require("../services/user-service");
const StatusCode = require("../utils/status-code");

exports.regenerateAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      throw ApiError.unauthorized("Unauthorized: refresh token not provided");
    }

    console.log(refreshToken);
    const payload = await jwt.verifyRefreshToken(refreshToken);
    const user = await userService.getByEmail(payload.email);

    if (!user) {
      throw ApiError.unauthorized("Unauthorized: user not found");
    }

    const accessToken = await jwt.generateAccessToken(payload.email);
    const newRefreshToken = await jwt.generateRefreshToken(payload.email);

    return res.status(StatusCode.OK).json({ accessToken: accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    return next(error);
  }
};
