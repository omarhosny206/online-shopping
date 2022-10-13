const StatusCode = require("../utils/status-code");

exports.handle = async (error, req, res, next) => {
  console.log("Message = ", error.message);
  console.log("Status = ", error.status);
  error.status = error.status || StatusCode.INTERNAL_SERVER_ERROR;
  return res.status(error.status).json({ message: error.message });
};
