const orderProductsRepository = require("../repositories/order-products-repository");
const ResponseError = require("../utils/response-error");
const StatusCode = require("../utils/status-code");

exports.searchAll = async (searchAllCriteria) => {
  try {
    const orderProducts = await orderProductsRepository.searchAll(searchAllCriteria);
    return orderProducts;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const orderProduct = await orderProductsRepository.searchOne(searchAllCriteria);
    return orderProduct;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.save = async (orderProduct) => {
  try {
    const storedOrderProduct = await this.searchOne({
      orderId: orderProduct.orderId,
      userId: orderProduct.userId,
      productId: orderProduct.productId,
    });

    if (storedOrderProduct) {
      throw ResponseError.of("Can't save, this product is already exist", StatusCode.BAD_REQUEST);
    }

    await orderProductsRepository.save(orderProduct);
  } catch (error) {
    throw ResponseError.from(error);
  }
};
