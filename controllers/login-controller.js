const loginService = require("../services/login-service");
const StatusCode = require("../utils/status-code");

exports.login = async (req, res, next) => {
  try {
    const user = req.body;
    const result = await loginService.login(user);
    return res.status(StatusCode.OK).json(result);
  } catch (error) {
    return next(error);
  }
};
