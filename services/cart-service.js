const cartRepository = require("../repositories/cart-repository");
const userService = require("../services/user-service");
const ResponseError = require("../utils/response-error");
const StatusCode = require("../utils/status-code");

exports.getById = async (id) => {
  try {
    const cart = await cartRepository.getById(id);
    return cart;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getUser = async (id) => {
  try {
    const user = await cartRepository.getUser(id);
    return user;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getByUserId = async (userId) => {
  try {
    const cart = await cartRepository.getByUserId(userId);
    return cart;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getInfo = async (cart) => {
  try {
    const storedCart = await this.getByUserId(cart.userId);

    if (!storedCart) {
      throw ResponseError.of("Can't get info, this user does not exist", StatusCode.BAD_REQUEST);
    }

    cart.id = storedCart.id;
    const info = await cartRepository.getInfo(cart);
    return info;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.save = async (userId) => {
  try {
    let storedUser = userService.getById(userId);
    let storedCart = this.getByUserId(userId);

    [storedUser, storedCart] = await Promise.all([storedUser, storedCart]);

    if (!storedUser) {
      throw ResponseError.of("Can't save, this user does not exist", StatusCode.BAD_REQUEST);
    }

    if (storedCart) {
      throw ResponseError.of("Can't save, this user already has a cart", StatusCode.BAD_REQUEST);
    }

    await cartRepository.save(userId);
  } catch (error) {
    throw ResponseError.from(error);
  }
};
