const cartItemService = require("../services/cart-item-service");
const StatusCode = require("../utils/status-code");

exports.save = async (req, res, next) => {
  try {
    const cartItem = req.body;
    cartItem.customerId = req.user.id;
    await cartItemService.save(cartItem);
    return res.status(StatusCode.CREATED).json({ message: "Created successfully" });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const cartItem = req.body;
    cartItem.customerId = req.user.id;
    await cartItemService.update(cartItem);
    return res.status(StatusCode.OK).json({ message: "Updated successfully" });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const cartItem = req.body;
    cartItem.customerId = req.user.id;
    await cartItemService.delete(cartItem);
    return res.status(StatusCode.OK).json({ message: "Deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
