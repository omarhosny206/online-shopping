const orderItemRepository = require("../repositories/order-item-repository");
const ApiError = require("../utils/api-error");

exports.searchAll = async (searchAllCriteria) => {
  try {
    const orderItem = await orderItemRepository.searchAll(searchAllCriteria);
    return orderItem;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const orderItem = await orderItemRepository.searchOne(searchAllCriteria);
    return orderItem;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (orderItem) => {
  try {
    const storedorderItem = await this.searchOne({
      orderId: orderItem.orderId,
      userId: orderItem.userId,
      productId: orderItem.productId,
    });

    if (storedorderItem) {
      throw ApiError.badRequest("Can't save, this product is already exist");
    }

    await orderItemRepository.save(orderItem);
  } catch (error) {
    throw ApiError.from(error);
  }
};
