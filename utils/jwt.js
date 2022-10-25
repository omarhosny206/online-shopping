const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");
const StatusCode = require("./status-code");
const ResponseError = require("./response-error");
const secretKey = process.env.JWT_SECRET_KEY;
const expiration = { expiresIn: process.env.JWT_EXPIRATION };

exports.generate = async (email) => {
  try {
    const token = await jwt.sign({ email: email }, secretKey, expiration);
    return token;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.verify = async (token) => {
  try {
    const payload = await jwt.verify(token, secretKey);
    return payload;
  } catch (error) {
    throw ResponseError.of(error.message, StatusCode.UNAUTHORIZED);
  }
};
