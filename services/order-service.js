const orderRepository = require("../repositories/order-repository");
const cartService = require("../services/cart-service");
const cartProductsService = require("../services/cart-products-service");
const orderProductsService = require("../services/order-products-service");
const ApiError = require("../utils/api-error");

exports.getByUserId = async (userId) => {
  try {
    const orders = await orderRepository.getByUserId(userId);
    return orders;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getById = async (id) => {
  try {
    const order = await orderRepository.getById(id);
    return order;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getUser = async (id) => {
  try {
    const user = await orderRepository.getUser(id);
    return user;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const order = await orderRepository.searchOne(searchAllCriteria);
    return order;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getInfo = async (order) => {
  try {
    const storedOrder = await this.searchOne({ id: order.id, userId: order.userId });

    if (!storedOrder) {
      throw ApiError.badRequest("Can't get info, this order does not exist");
    }

    const info = await orderRepository.getInfo(order);
    return info;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (userId) => {
  try {
    const storedCart = await cartService.getByUserId(userId);

    if (!storedCart) {
      throw ApiError.badRequest("Can't save, this user does not exist");
    }

    const storedCartProducts = await cartProductsService.searchAll({ cartId: storedCart.id });

    if (!storedCartProducts.length) {
      throw ApiError.badRequest("Can't save, the cart is empty");
    }

    const storedOrder = await orderRepository.save(userId);

    await Promise.all(
      storedCartProducts.map(async (storedCartProduct) => {
        const orderProduct = {
          orderId: storedOrder.id,
          userId: storedCartProduct.userId,
          productId: storedCartProduct.productId,
          quantity: storedCartProduct.quantity,
        };
        await orderProductsService.save(orderProduct);
      })
    );

    await cartService.clear(storedCart);
  } catch (error) {
    throw ApiError.from(error);
  }
};
