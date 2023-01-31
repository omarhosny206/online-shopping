const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");
const ApiError = require("./api-error");

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;

exports.generateAccessToken = async (email) => {
  try {
    const signOptions = { expiresIn: ACCESS_TOKEN_EXPIRATION };
    const token = await jwt.sign({ email: email }, ACCESS_TOKEN_SECRET_KEY, signOptions);
    return token;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.generateRefreshToken = async (email) => {
  try {
    const signOptions = { expiresIn: REFRESH_TOKEN_EXPIRATION };
    const token = await jwt.sign({ email: email }, REFRESH_TOKEN_SECRET_KEY, signOptions);
    return token;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.verifyAccessToken = async (accessToken) => {
  try {
    const payload = await jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY);
    return payload;
  } catch (error) {
    throw ApiError.unauthorized(error.message);
  }
};

exports.verifyRefreshToken = async (refreshToken) => {
  try {
    const payload = await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY);
    return payload;
  } catch (error) {
    throw ApiError.unauthorized(error.message);
  }
};
