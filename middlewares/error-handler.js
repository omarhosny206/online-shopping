exports.handle = async (error, req, res, next) => {
  console.log("Message = ", error.message);
  console.log("Status = ", error.status);
  error.status = error.status || 500;
  return res.status(error.status).json({ message: error.message });
};
