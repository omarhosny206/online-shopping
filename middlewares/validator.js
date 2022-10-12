const StatusCode = require("../utils/status-code");
const ResponseError = require("../utils/response-error");

exports.validate = (schema) => async (req, res, next) => {
  try {
    const body = req.body;
    const value = await schema.validateAsync(body, { abortEarly: false });
    next();
  } catch (error) {
    const messages = error.details.map((errorDetails) => errorDetails.message);
    next(ResponseError.of(messages, StatusCode.BAD_REQUEST));
  }
};
