const productService = require("../services/product-service");
const StatusCode = require("../utils/status-code");

exports.getAll = async (req, res, next) => {
  try {
    const products = await productService.getAll();
    return res.status(StatusCode.OK).json(products);
  } catch (error) {
    return next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const searchCritreia = req.query;
    const products = await productService.search(searchCritreia);
    return res.status(StatusCode.OK).json(products);
  } catch (error) {
    return next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const product = await productService.getById(id);
    return res.status(StatusCode.OK).json(product);
  } catch (error) {
    return next(error);
  }
};

exports.getByName = async (req, res, next) => {
  try {
    const product = await productService.getByName(name);
    return res.status(StatusCode.OK).json(product);
  } catch (error) {
    return next(error);
  }
};

exports.save = async (req, res, next) => {
  try {
    const product = req.body;
    await productService.save(product);
    return res.status(StatusCode.CREATED).json({ message: "Created successfully" });
  } catch (error) {
    return next(error);
  }
};
