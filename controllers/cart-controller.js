const cartService = require("../services/cart-service");
const StatusCode = require("../utils/status-code");

exports.getByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await cartService.getByUserId(userId);
    return res.status(StatusCode.OK).json(cart);
  } catch (error) {
    return next(error);
  }
};

exports.getInfo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = { id: null, userId: userId };
    const info = await cartService.getInfo(cart);
    return res.status(StatusCode.OK).json(info);
  } catch (error) {
    return next(error);
  }
};

exports.save = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await cartService.save(userId);
    return res.status(StatusCode.CREATED).json({ message: "Created successfully" });
  } catch (error) {
    return next(error);
  }
};

exports.clear = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = { id: null, userId: userId };
    await cartService.clear(cart);
    return res.status(StatusCode.CREATED).json({ message: "Cleared successfully" });
  } catch (error) {
    return next(error);
  }
};
