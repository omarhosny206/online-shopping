const tables = require("../utils/tables");
const ApiError = require("../utils/api-error");

const CartProducts = tables.cartProducts;

exports.getAll = async () => {
  try {
    const cartProducts = await CartProducts.findAll();
    return cartProducts;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchAll = async (searchAllCriteria) => {
  try {
    const predicate = { where: { ...searchAllCriteria } };
    const cartProducts = await CartProducts.findAll(predicate);
    return cartProducts;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const predicate = { where: { ...searchAllCriteria } };
    const cartProduct = await CartProducts.findOne(predicate);
    return cartProduct;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (cartProduct) => {
  try {
    const storedCartProduct = await CartProducts.create(cartProduct);
    return storedCartProduct;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.update = async (cartProduct) => {
  try {
    const predicate = { where: { cartId: cartProduct.cartId, userId: cartProduct.userId, productId: cartProduct.productId } };
    await CartProducts.update(cartProduct, predicate);
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.delete = async (cartProduct) => {
  try {
    const predicate = { where: { cartId: cartProduct.cartId, userId: cartProduct.userId, productId: cartProduct.productId } };
    await CartProducts.destroy(predicate);
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.clear = async (cartId) => {
  try {
    const predicate = { where: { cartId: cartId } };
    await CartProducts.destroy(predicate);
  } catch (error) {
    throw ApiError.from(error);
  }
};
