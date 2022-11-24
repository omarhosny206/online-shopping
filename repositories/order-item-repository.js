const tables = require("../utils/tables");
const ApiError = require("../utils/api-error");

const orderItem = tables.orderItem;

exports.searchAll = async (searchAllCriteria) => {
  try {
    const predicate = { where: { ...searchAllCriteria } };
    const orderItem = await orderItem.findAll(predicate);
    return orderItem;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const predicate = { where: { ...searchAllCriteria } };
    const orderItem = await orderItem.findOne(predicate);
    return orderItem;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (orderProduct) => {
  try {
    const storedOrderProduct = await orderItem.create(orderProduct);
    return storedOrderProduct;
  } catch (error) {
    throw ApiError.from(error);
  }
};
