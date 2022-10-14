const userService = require("../services/user-service");
const productService = require("../services/product-service");
const orderProductsService = require("../services/order-products-service");
const userProductsService = require("../services/user-products-service");
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
    const orders = await Order.findAll(predicate);
    return orders;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.searchOne = async (searchCriteria) => {
  try {
    const predicate = { where: { ...searchCriteria } };
    const order = await Order.findOne(predicate);
    return order;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getInfo = async (order) => {
  try {
    const orderProducts = await orderProductsService.search({ orderId: order.id });

    const info = await Promise.all(
      orderProducts.map(async (orderProduct) => {
        let product = productService.getById(orderProduct.productId);
        let seller = userService.getById(orderProduct.userId);
        let customer = this.getUser(orderProduct.orderId);
        let userProduct = userProductsService.search({ userId: orderProduct.userId, productId: orderProduct.productId });

        [product, seller, customer, userProduct] = await Promise.all([product, seller, customer, userProduct]);

        return {
          customer: `${customer.firstName} ${customer.lastName}`,
          seller: `${seller.firstName} ${seller.lastName}`,
          product: product.name,
          price: userProduct.price,
          quantity: orderProduct.quantity,
          totalPrice: userProduct.price * orderProduct.quantity,
        };
      })
    );

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
