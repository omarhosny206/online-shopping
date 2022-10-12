exports.handle = async (error, req, res, next) => {
  return res.status(error.status).json({ message: error.message });
};
