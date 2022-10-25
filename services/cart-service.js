const cartRepository = require("../repositories/cart-repository");
const userService = require("../services/user-service");
const ApiError = require("../utils/api-error");

exports.getById = async (id) => {
  try {
    const cart = await cartRepository.getById(id);
    return cart;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getUser = async (id) => {
  try {
    const user = await cartRepository.getUser(id);
    return user;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getByUserId = async (userId) => {
  try {
    const cart = await cartRepository.getByUserId(userId);
    return cart;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getInfo = async (cart) => {
  try {
    const storedCart = await this.getByUserId(cart.userId);

    if (!storedCart) {
      throw ApiError.badRequest("Can't get info, this user does not exist");
    }

    cart.id = storedCart.id;
    const info = await cartRepository.getInfo(cart);
    return info;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (userId) => {
  try {
    let storedUser = userService.getById(userId);
    let storedCart = this.getByUserId(userId);

    [storedUser, storedCart] = await Promise.all([storedUser, storedCart]);

    if (!storedUser) {
      throw ApiError.badRequest("Can't save, this user does not exist");
    }

    if (storedCart) {
      throw ApiError.badRequest("Can't save, this user already has a cart");
    }

    await cartRepository.save(userId);
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.clear = async (cart) => {
  try {
    const storedCart = await this.getByUserId(cart.userId);

    if (!storedCart) {
      throw ApiError.badRequest("Can't clear the cart, this user does not exist");
    }

    cart.id = storedCart.id;
    await cartRepository.clear(cart);
  } catch (error) {
    throw ApiError.from(error);
  }
};
