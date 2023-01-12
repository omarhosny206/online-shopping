const userService = require("../services/user-service");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const ApiError = require("../utils/api-error");

exports.login = async (user) => {
  try {
    const { email, password } = user;
    const storedUser = await userService.getByEmail(email);

    if (!storedUser) {
      throw ApiError.unauthorized("Bad Credentials: Invalid email");
    }

    const hashedPassword = storedUser.password;
    const areEqualPasswords = await bcrypt.compare(password, hashedPassword);

    if (!areEqualPasswords) {
      throw ApiError.unauthorized("Bad Credentials: Invalid password");
    }

    const token = await jwt.generate(email);
    return token;
  } catch (error) {
    throw ApiError.from(error);
  }
};
