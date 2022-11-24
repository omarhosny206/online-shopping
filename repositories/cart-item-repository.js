const tables = require("../utils/tables");
const ApiError = require("../utils/api-error");

const cartItem = tables.cartItem;

exports.getAll = async () => {
  try {
    const cartItem = await cartItem.findAll();
    return cartItem;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchAll = async (searchAllCriteria) => {
  try {
    const predicate = { where: { ...searchAllCriteria } };
    const cartItem = await cartItem.findAll(predicate);
    return cartItem;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const predicate = { where: { ...searchAllCriteria } };
    const cartProduct = await cartItem.findOne(predicate);
    return cartProduct;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (cartProduct) => {
  try {
    const storedCartProduct = await cartItem.create(cartProduct);
    return storedCartProduct;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.update = async (cartProduct) => {
  try {
    const predicate = { where: { cartId: cartProduct.cartId, userId: cartProduct.userId, productId: cartProduct.productId } };
    await cartItem.update(cartProduct, predicate);
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.delete = async (cartProduct) => {
  try {
    const predicate = { where: { cartId: cartProduct.cartId, userId: cartProduct.userId, productId: cartProduct.productId } };
    await cartItem.destroy(predicate);
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.clear = async (cartId) => {
  try {
    const predicate = { where: { cartId: cartId } };
    await cartItem.destroy(predicate);
  } catch (error) {
    throw ApiError.from(error);
  }
};
