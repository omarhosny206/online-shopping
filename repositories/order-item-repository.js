const tables = require("../utils/tables");
const ApiError = require("../utils/api-error");

const OrderItem = tables.orderItem;

exports.searchAll = async (searchAllCriteria) => {
  try {
    const predicate = { where: { ...searchAllCriteria } };
    const orderItem = await OrderItem.findAll(predicate);
    return orderItem;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const predicate = { where: { ...searchAllCriteria } };
    const orderItem = await OrderItem.findOne(predicate);
    return orderItem;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (orderItem) => {
  try {
    const storedorderItem = await OrderItem.create(orderItem);
    return storedorderItem;
  } catch (error) {
    throw ApiError.from(error);
  }
};
