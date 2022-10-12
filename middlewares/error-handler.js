exports.handle = async (error, req, res, next) => {
  console.log("Message = ", error.message);
  console.log("Status = ", error.status);
  return res.status(error.status).json({ message: error.message });
};
