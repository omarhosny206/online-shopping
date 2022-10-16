const userProductsRepository = require("../repositories/user-products-repository");
const userService = require("../services/user-service");
const productService = require("../services/product-service");
const ResponseError = require("../utils/response-error");
const StatusCode = require("../utils/status-code");

exports.getAll = async () => {
  try {
    const userProducts = await userProductsRepository.getAll();
    return userProducts;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.searchAll = async (searchAllCriteria) => {
  try {
    const userProduct = await userProductsRepository.searchAll(searchAllCriteria);
    return userProduct;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getProductsById = async (id) => {
  try {
    const products = await userProductsRepository.getProductsById(id);
    return products;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.save = async (userProduct) => {
  try {
    let storedUser = userService.getById(userProduct.userId);
    let storedProduct = productService.getById(userProduct.productId);
    let storedUserProduct = this.searchAll({ userId: userProduct.userId, productId: userProduct.productId });

    [storedUser, storedProduct, storedUserProduct] = await Promise.all([storedUser, storedProduct, storedUserProduct]);

    if (!storedUser) {
      throw ResponseError.of("Can't save, this user does not exist", StatusCode.BAD_REQUEST);
    }

    if (!storedProduct) {
      throw ResponseError.of("Can't save, this product does not exist", StatusCode.BAD_REQUEST);
    }

    if (storedUserProduct) {
      throw ResponseError.of("Can't save, this is already exist", StatusCode.BAD_REQUEST);
    }

    await userProductsRepository.save(userProduct);
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.update = async (userProduct) => {
  try {
    let storedUser = userService.getById(userProduct.userId);
    let storedProduct = productService.getById(userProduct.productId);
    let storedUserProduct = this.searchAll({ userId: userProduct.userId, productId: userProduct.productId });

    [storedUser, storedProduct, storedUserProduct] = await Promise.all([storedUser, storedProduct, storedUserProduct]);

    if (!storedUser) {
      throw ResponseError.of("Can't update, this user does not exist", StatusCode.BAD_REQUEST);
    }

    if (!storedProduct) {
      throw ResponseError.of("Can't update, this product does not exist", StatusCode.BAD_REQUEST);
    }

    if (!storedUserProduct) {
      throw ResponseError.of("Can't update, this does not exist", StatusCode.BAD_REQUEST);
    }

    await userProductsRepository.update(userProduct);
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.delete = async (userProduct) => {
  try {
    let storedUser = userService.getById(userProduct.userId);
    let storedProduct = productService.getById(userProduct.productId);
    let storedUserProduct = this.searchAll({ userId: userProduct.userId, productId: userProduct.productId });

    [storedUser, storedProduct, storedUserProduct] = await Promise.all([storedUser, storedProduct, storedUserProduct]);

    if (!storedUser) {
      throw ResponseError.of("Can't delete, this user does not exist", StatusCode.BAD_REQUEST);
    }

    if (!storedProduct) {
      throw ResponseError.of("Can't delete, this product does not exist", StatusCode.BAD_REQUEST);
    }

    if (!storedUserProduct) {
      throw ResponseError.of("Can't delete, this does not exist", StatusCode.BAD_REQUEST);
    }

    await userProductsRepository.delete(userProduct);
  } catch (error) {
    throw ResponseError.from(error);
  }
};
