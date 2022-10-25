const tables = require("../utils/tables");
const ApiError = require("../utils/api-error");

const OrderProducts = tables.orderProducts;

exports.searchAll = async (searchAllCriteria) => {
  try {
    const predicate = { where: { ...searchAllCriteria } };
    const orderProducts = await OrderProducts.findAll(predicate);
    return orderProducts;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const predicate = { where: { ...searchAllCriteria } };
    const orderProducts = await OrderProducts.findOne(predicate);
    return orderProducts;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (orderProduct) => {
  try {
    const storedOrderProduct = await OrderProducts.create(orderProduct);
    return storedOrderProduct;
  } catch (error) {
    throw ApiError.from(error);
  }
};
