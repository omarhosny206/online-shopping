const tables = require("../utils/tables");
const ResponseError = require("../utils/response-error");

const Cart = tables.cart;

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
