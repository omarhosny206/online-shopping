const orderRepository = require("../repositories/order-repository");
const cartService = require("../services/cart-service");
const cartProductsService = require("../services/cart-products-service");
const orderProductsService = require("../services/order-products-service");
const ResponseError = require("../utils/response-error");
const StatusCode = require("../utils/status-code");

exports.getById = async (id) => {
  try {
    const order = await orderRepository.getById(id);
    return order;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getUser = async (id) => {
  try {
    const user = await orderRepository.getUser(id);
    return user;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getByUserId = async (userId) => {
  try {
    const order = await orderRepository.getByUserId(userId);
    return order;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getInfo = async (order) => {
  try {
    const info = await orderRepository.getInfo(order);
    return info;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.save = async (userId) => {
  try {
    const storedCart = await cartService.getByUserId(userId);

    if (!storedCart) {
      throw ResponseError.of("Can't save, this user does not exist", StatusCode.BAD_REQUEST);
    }

    const storedCartProducts = await cartProductsService.search({ cartId: storedCart.id });

    if (!storedCartProducts.length) {
      throw ResponseError.of("Can't save, the cart is empty", StatusCode.BAD_REQUEST);
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
    throw ResponseError.from(error);
  }
};
