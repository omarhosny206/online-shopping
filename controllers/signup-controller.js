const signupService = require("../services/signup-service");
const StatusCode = require("../utils/status-code");

exports.signup = async (req, res, next) => {
  try {
    const user = req.body;
    await signupService.signup(user);
    return res.status(StatusCode.CREATED).json({ message: "Signed up successfully" });
  } catch (error) {
    return next(error);
  }
};
