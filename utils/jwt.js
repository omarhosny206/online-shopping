const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");
const ApiError = require("./api-error");
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const EXPIRATION = { expiresIn: process.env.JWT_EXPIRATION };

exports.generate = async (email) => {
  try {
    const token = await jwt.sign({ email: email }, SECRET_KEY, EXPIRATION);
    return token;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.verify = async (token) => {
  try {
    const payload = await jwt.verify(token, secretKey);
    return payload;
  } catch (error) {
    throw ApiError.unauthorized(error.message);
  }
};
