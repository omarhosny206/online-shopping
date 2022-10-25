const cartProductsRepository = require("../repositories/cart-products-repository");
const userProductsService = require("../services/user-products-service");
const cartService = require("../services/cart-service");
const ApiError = require("../utils/api-error");

exports.getAll = async () => {
  try {
    const cartProducts = await cartProductsRepository.getAll();
    return cartProducts;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchAll = async (searchAllCriteria) => {
  try {
    const cartProducts = await cartProductsRepository.searchAll(searchAllCriteria);
    return cartProducts;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const cartProduct = await cartProductsRepository.searchOne(searchAllCriteria);
    return cartProduct;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (cartProduct) => {
  try {
    let storedCart = cartService.getByUserId(cartProduct.customerId);
    let storedUserProducts = userProductsService.searchAll({ userId: cartProduct.userId, productId: cartProduct.productId });

    [storedCart, storedUserProducts] = await Promise.all([storedCart, storedUserProducts]);

    if (!storedCart) {
      throw ApiError.badRequest("Can't save, this user does not exist");
    }

    if (!storedUserProducts) {
      throw ApiError.badRequest("Can't save, the seller does not have this product");
    }

    cartProduct.cartId = storedCart.id;

    const storedCartProduct = await this.searchOne({ cartId: cartProduct.cartId, userId: cartProduct.userId, productId: cartProduct.productId });

    if (storedCartProduct) {
      throw ApiError.badRequest("Can't save, this product is already exist");
    }

    await cartProductsRepository.save(cartProduct);
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

    await cartProductsRepository.update(cartProduct);
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

    await cartProductsRepository.delete(cartProduct);
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.clear = async (cartId) => {
  try {
    const storedCartProducts = await this.searchAll({ cartId: cartId });

    if (!storedCartProducts.length) {
      throw ApiError.badRequest("Can't clear this cart, it is already empty");
    }

    await cartProductsRepository.clear(cartId);
  } catch (error) {
    throw ApiError.from(error);
  }
};
