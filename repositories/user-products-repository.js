const productService = require("../services/product-service");
const tables = require("../utils/tables");
const ApiError = require("../utils/api-error");

const UserProducts = tables.userProducts;

exports.getAll = async () => {
  try {
    const userProducts = await UserProducts.findAll();
    return userProducts;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchAll = async (searchAllCriteria) => {
  try {
    const predicate = { where: { ...searchAllCriteria } };
    const userProduct = await UserProducts.findOne(predicate);
    return userProduct;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getProductsById = async (id) => {
  try {
    const predicate = { where: { userId: id } };
    const userProducts = await UserProducts.findAll(predicate);

    const products = await Promise.all(
      userProducts.map(async (userProduct) => {
        const product = await productService.getById(userProduct.productId);
        return { product: product.name, price: userProduct.price };
      })
    );

    return products;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (userProduct) => {
  try {
    const storedUserProduct = await UserProducts.create(userProduct);
    return storedUserProduct;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.update = async (userProduct) => {
  try {
    const predicate = { where: { userId: userProduct.userId, productId: userProduct.productId } };
    await UserProducts.update(userProduct, predicate);
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.delete = async (userProduct) => {
  try {
    const predicate = { where: { userId: userProduct.userId, productId: userProduct.productId } };
    await UserProducts.destroy(predicate);
  } catch (error) {
    throw ApiError.from(error);
  }
};
