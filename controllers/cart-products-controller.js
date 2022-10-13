const cartProductsService = require("../services/cart-products-service");
const StatusCode = require("../utils/status-code");

exports.save = async (req, res, next) => {
  try {
    const cartProduct = req.body;
    cartProduct.customerId = req.user.id;
    await cartProductsService.save(cartProduct);
    return res.status(StatusCode.CREATED).json({ message: "Created successfully" });
  } catch (error) {
    return next(error);
  }
};
