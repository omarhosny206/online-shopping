const orderProductsRepository = require("../repositories/order-products-repository");
const ApiError = require("../utils/api-error");

exports.searchAll = async (searchAllCriteria) => {
  try {
    const orderProducts = await orderProductsRepository.searchAll(searchAllCriteria);
    return orderProducts;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const orderProduct = await orderProductsRepository.searchOne(searchAllCriteria);
    return orderProduct;
  } catch (error) {
    throw ApiError.from(error);
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
      throw ApiError.badRequest("Can't save, this product is already exist");
    }

    await orderProductsRepository.save(orderProduct);
  } catch (error) {
    throw ApiError.from(error);
  }
};
