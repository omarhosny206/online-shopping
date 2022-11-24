const userService = require("../services/user-service");
const productService = require("../services/product-service");
const orderItemService = require("../services/order-item-service");
const userProductService = require("../services/user-product-service");
const tables = require("../utils/tables");
const ApiError = require("../utils/api-error");

const Order = tables.order;
const User = tables.user;

exports.getByUserId = async (userId) => {
  try {
    const predicate = { where: { userId: userId } };
    const orders = await Order.findAll(predicate);
    return orders;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getById = async (id) => {
  try {
    const order = await Order.findByPk(id);
    return order;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getUser = async (id) => {
  try {
    const order = await Order.findByPk(id, { include: [User], raw: false });

    if (!order) {
      return null;
    }

    const user = order.user;
    return user;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const predicate = { where: { ...searchAllCriteria } };
    const order = await Order.findOne(predicate);
    return order;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getInfo = async (order) => {
  try {
    const orderItem = await orderItemService.searchAll({ orderId: order.id });
    let price = 0;

    const details = await Promise.all(
      orderItem.map(async (orderItem) => {
        let product = productService.getById(orderItem.productId);
        let seller = userService.getById(orderItem.userId);
        let customer = this.getUser(orderItem.orderId);
        let userProduct = userProductService.searchAll({ userId: orderItem.userId, productId: orderItem.productId });

        [product, seller, customer, userProduct] = await Promise.all([product, seller, customer, userProduct]);

        price += userProduct.price * orderItem.quantity;

        return {
          customerName: `${customer.firstName} ${customer.lastName}`,
          sellerName: `${seller.firstName} ${seller.lastName}`,
          productName: product.name,
          productPrice: userProduct.price,
          quantity: orderItem.quantity,
          totalPrice: userProduct.price * orderItem.quantity,
        };
      })
    );

    const info = { price: price, details: details };
    return info;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (userId) => {
  try {
    const order = { userId: userId };
    const result = await Order.create(order);
    const storedOrder = result.dataValues;
    return storedOrder;
  } catch (error) {
    throw ApiError.from(error);
  }
};
