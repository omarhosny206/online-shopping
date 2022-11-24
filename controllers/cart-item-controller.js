const cartItemService = require("../services/cart-products-service");
const StatusCode = require("../utils/status-code");

exports.save = async (req, res, next) => {
  try {
    const cartProduct = req.body;
    cartProduct.customerId = req.user.id;
    await cartItemService.save(cartProduct);
    return res.status(StatusCode.CREATED).json({ message: "Created successfully" });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const cartProduct = req.body;
    cartProduct.customerId = req.user.id;
    await cartItemService.update(cartProduct);
    return res.status(StatusCode.OK).json({ message: "Updated successfully" });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const cartProduct = req.body;
    cartProduct.customerId = req.user.id;
    await cartItemService.delete(cartProduct);
    return res.status(StatusCode.OK).json({ message: "Deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
