const cartItemRepository = require("../repositories/cart-products-repository");
const userProductService = require("../services/user-products-service");
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
    const cartProduct = await cartItemRepository.searchOne(searchAllCriteria);
    return cartProduct;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (cartProduct) => {
  try {
    let storedCart = cartService.getByUserId(cartProduct.customerId);
    let storeduserProduct = userProductService.searchAll({ userId: cartProduct.userId, productId: cartProduct.productId });

    [storedCart, storeduserProduct] = await Promise.all([storedCart, storeduserProduct]);

    if (!storedCart) {
      throw ApiError.badRequest("Can't save, this user does not exist");
    }

    if (!storeduserProduct) {
      throw ApiError.badRequest("Can't save, the seller does not have this product");
    }

    cartProduct.cartId = storedCart.id;

    const storedCartProduct = await this.searchOne({ cartId: cartProduct.cartId, userId: cartProduct.userId, productId: cartProduct.productId });

    if (storedCartProduct) {
      throw ApiError.badRequest("Can't save, this product is already exist");
    }

    await cartItemRepository.save(cartProduct);
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.update = async (cartProduct) => {
  try {
    const storedCart = await cartService.getByUserId(cartProduct.customerId);

    if (!storedCart) {
      throw ApiError.badRequest("Can't update, this user does not exist");
    }

    cartProduct.cartId = storedCart.id;
    const storedCartProduct = await this.searchOne({ cartId: cartProduct.cartId, userId: cartProduct.userId, productId: cartProduct.productId });

    if (!storedCartProduct) {
      throw ApiError.badRequest("Can't update, this product does not exist on the cart");
    }

    await cartItemRepository.update(cartProduct);
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.delete = async (cartProduct) => {
  try {
    const storedCart = await cartService.getByUserId(cartProduct.customerId);

    if (!storedCart) {
      throw ApiError.badRequest("Can't delete, this user does not exist");
    }

    cartProduct.cartId = storedCart.id;
    const storedCartProduct = await this.searchOne({ cartId: cartProduct.cartId, userId: cartProduct.userId, productId: cartProduct.productId });

    if (!storedCartProduct) {
      throw ApiError.badRequest("Can't delete, this product does not exist on the cart");
    }

    await cartItemRepository.delete(cartProduct);
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
