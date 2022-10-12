const StatusCode = require("../utils/status-code");
const ResponseError = require("../utils/response-error");

exports.handle = async (req, res, next) => {
  const { url } = req;
  next(ResponseError.of(`not found: ${url}`, StatusCode.NOT_FOUND));
};
