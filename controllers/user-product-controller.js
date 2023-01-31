const userProductService = require("../services/user-product-service");
const StatusCode = require("../utils/status-code");

exports.getAll = async (req, res, next) => {
  try {
    const userProduct = await userProductService.getAll();
    return res.status(StatusCode.OK).json(userProduct);
  } catch (error) {
    return next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const id = req.authenticatedUser.id;
    const products = await userProductService.getProductsById(id);
    return res.status(StatusCode.OK).json(products);
  } catch (error) {
    return next(error);
  }
};

exports.save = async (req, res, next) => {
  try {
    const userProduct = req.body;
    userProduct.userId = req.authenticatedUser.id;
    await userProductService.save(userProduct);
    return res.status(StatusCode.CREATED).json({ message: "Created successfully" });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const userProduct = req.body;
    userProduct.userId = req.authenticatedUser.id;
    await userProductService.update(userProduct);
    return res.status(StatusCode.OK).json({ message: "Updated successfully" });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const userProduct = { userId: req.authenticatedUser.id, productId: req.params.productId };
    await userProductService.delete(userProduct);
    return res.status(StatusCode.OK).json({ message: "Deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
