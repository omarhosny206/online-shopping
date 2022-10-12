const userService = require("../services/user-service");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const ResponseError = require("../utils/response-error");
const StatusCode = require("../utils/status-code");

exports.login = async (user) => {
  try {
    const { email, password } = user;
    const storedUser = await userService.getByEmail(email);

    if (!storedUser) {
      throw ResponseError.of("Invalid email", StatusCode.BAD_REQUEST);
    }

    const hashedPassword = storedUser.password;
    const areEqual = await bcrypt.compare(password, hashedPassword);

    if (!areEqual) {
      throw ResponseError.of("Invalid password", StatusCode.BAD_REQUEST);
    }

    const token = await jwt.generate(email);
    return token;
  } catch (error) {
    throw ResponseError.from(error);
  }
};
