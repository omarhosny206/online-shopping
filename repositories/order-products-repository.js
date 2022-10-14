const tables = require("../utils/tables");
const ResponseError = require("../utils/response-error");

const OrderProducts = tables.orderProducts;

exports.search = async (searchCriteria) => {
  try {
    const predicate = { where: { ...searchCriteria } };
    const orderProducts = await OrderProducts.findAll(predicate);
    return orderProducts;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.searchOne = async (searchCriteria) => {
  try {
    const predicate = { where: { ...searchCriteria } };
    const orderProducts = await OrderProducts.findOne(predicate);
    return orderProducts;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.save = async (orderProduct) => {
  try {
    const savedOrderProduct = await OrderProducts.create(orderProduct);
    return savedOrderProduct;
  } catch (error) {
    throw ResponseError.from(error);
  }
};
