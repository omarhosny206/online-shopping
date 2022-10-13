const userProductsService = require("../services/user-products-service");
const StatusCode = require("../utils/status-code");

exports.getAll = async (req, res, next) => {
  try {
    const userProducts = await userProductsService.getAll();
    return res.status(StatusCode.OK).json(userProducts);
  } catch (error) {
    return next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const id = req.user.id;
    const products = await userProductsService.getProductsById(id);
    return res.status(StatusCode.OK).json(products);
  } catch (error) {
    return next(error);
  }
};

exports.save = async (req, res, next) => {
  try {
    const userProduct = req.body;
    userProduct.userId = req.user.id;
    await userProductsService.save(userProduct);
    return res.status(StatusCode.CREATED).json({ message: "Created successfully" });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const userProduct = req.body;
    userProduct.userId = req.user.id;
    await userProductsService.update(userProduct);
    return res.status(StatusCode.OK).json({ message: "Updated successfully" });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const userProduct = { userId: req.user.id, productId: req.params.productId };
    await userProductsService.delete(userProduct);
    return res.status(StatusCode.OK).json({ message: "Deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
