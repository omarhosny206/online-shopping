const tables = require("../utils/tables");
const ResponseError = require("../utils/response-error");

const Cart = tables.cart;
const User = tables.user;

exports.getById = async (id) => {
  try {
    const cart = await Cart.findByPk(id);
    return cart;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getUser = async (id) => {
  try {
    const cart = await Cart.findByPk(id, { include: [User], raw: false });
    const user = cart.user;
    return user;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getByUserId = async (userId) => {
  try {
    const predicate = { where: { userId: userId } };
    const cart = await Cart.findOne(predicate);
    return cart;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.save = async (userId) => {
  try {
    const cart = { userId: userId };
    const savedCart = await Cart.create(cart);
    return savedCart;
  } catch (error) {
    throw ResponseError.from(error);
  }
};
