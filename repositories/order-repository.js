const tables = require("../utils/tables");
const ResponseError = require("../utils/response-error");

const Order = tables.order;
const User = tables.user;

exports.getById = async (id) => {
  try {
    const order = await Order.findByPk(id);
    return order;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getUser = async (id) => {
  try {
    const order = await Order.findByPk(id, { include: [User], raw: false });
    const user = order.user;
    return user;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getByUserId = async (userId) => {
  try {
    const predicate = { where: { userId: userId } };
    const order = await Order.findOne(predicate);
    return order;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getInfo = async (cart) => {
  try {
    const info = "a";
    return info;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.save = async (userId) => {
  try {
    const order = { userId: userId };
    const result = await Order.create(order);
    const savedOrder = result.dataValues;
    return savedOrder;
  } catch (error) {
    throw ResponseError.from(error);
  }
};
