const ApiError = require("../utils/api-error");

exports.handle = async (req, res, next) => {
  const { url } = req;
  next(ApiError.notFound(`not found: ${url}`));
};
