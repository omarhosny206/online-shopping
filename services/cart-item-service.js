const cartItemRepository = require("../repositories/cart-item-repository");
const userProductService = require("./user-product-service");
const cartService = require("../services/cart-service");
const ApiError = require("../utils/api-error");

exports.getAll = async () => {
  try {
    const cartItem = await cartItemRepository.getAll();
    return cartItem;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchAll = async (searchAllCriteria) => {
  try {
    const cartItem = await cartItemRepository.searchAll(searchAllCriteria);
    return cartItem;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const cartItem = await cartItemRepository.searchOne(searchAllCriteria);
    return cartItem;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (cartItem) => {
  try {
    let storedCart = cartService.getByUserId(cartItem.customerId);
    let storeduserProduct = userProductService.searchAll({ userId: cartItem.userId, productId: cartItem.productId });

    [storedCart, storeduserProduct] = await Promise.all([storedCart, storeduserProduct]);

    if (!storedCart) {
      throw ApiError.badRequest("Can't save, this user does not exist");
    }

    if (!storeduserProduct) {
      throw ApiError.badRequest("Can't save, the seller does not have this product");
    }

    cartItem.cartId = storedCart.id;

    const storedcartItem = await this.searchOne({ cartId: cartItem.cartId, userId: cartItem.userId, productId: cartItem.productId });

    if (storedcartItem) {
      storedcartItem.quantity += cartItem.quantity;
      await cartItemRepository.update(storedcartItem);
      return;
    }

    await cartItemRepository.save(cartItem);
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.update = async (cartItem) => {
  try {
    const storedCart = await cartService.getByUserId(cartItem.customerId);

    if (!storedCart) {
      throw ApiError.badRequest("Can't update, this user does not exist");
    }

    cartItem.cartId = storedCart.id;
    const storedcartItem = await this.searchOne({ cartId: cartItem.cartId, userId: cartItem.userId, productId: cartItem.productId });

    if (!storedcartItem) {
      throw ApiError.badRequest("Can't update, this product does not exist on the cart");
    }

    await cartItemRepository.update(cartItem);
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.delete = async (cartItem) => {
  try {
    const storedCart = await cartService.getByUserId(cartItem.customerId);

    if (!storedCart) {
      throw ApiError.badRequest("Can't delete, this user does not exist");
    }

    cartItem.cartId = storedCart.id;
    const storedcartItem = await this.searchOne({ cartId: cartItem.cartId, userId: cartItem.userId, productId: cartItem.productId });

    if (!storedcartItem) {
      throw ApiError.badRequest("Can't delete, this product does not exist on the cart");
    }

    await cartItemRepository.delete(cartItem);
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.clear = async (cartId) => {
  try {
    const storedcartItem = await this.searchAll({ cartId: cartId });

    if (!storedcartItem.length) {
      throw ApiError.badRequest("Can't clear this cart, it is already empty");
    }

    await cartItemRepository.clear(cartId);
  } catch (error) {
    throw ApiError.from(error);
  }
};
