const cartProductsRepository = require("../repositories/cart-products-repository");
const userProductsService = require("../services/user-products-service");
const cartService = require("../services/cart-service");
const ResponseError = require("../utils/response-error");
const StatusCode = require("../utils/status-code");

exports.getAll = async () => {
  try {
    const cartProductsRepository = await cartProductsRepository.getAll();
    return cartProductsRepository;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.search = async (searchCriteria) => {
  try {
    const cartProducts = await cartProductsRepository.search(searchCriteria);
    return cartProducts;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.searchOne = async (searchCriteria) => {
  try {
    const cartProduct = await cartProductsRepository.searchOne(searchCriteria);
    return cartProduct;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.save = async (cartProduct) => {
  try {
    let storedCart = cartService.getByUserId(cartProduct.customerId);
    let storedUserProducts = userProductsService.search({ userId: cartProduct.userId, productId: cartProduct.productId });

    [storedCart, storedUserProducts] = await Promise.all([storedCart, storedUserProducts]);

    if (!storedCart) {
      throw ResponseError.of("Can't save, this user does not exist", StatusCode.BAD_REQUEST);
    }

    if (!storedUserProducts) {
      throw ResponseError.of("Can't save, the seller does not have this product", StatusCode.BAD_REQUEST);
    }

    cartProduct.cartId = storedCart.id;

    const storedCartProduct = await this.searchOne({ cartId: cartProduct.cartId, userId: cartProduct.userId, productId: cartProduct.productId });

    if (storedCartProduct) {
      throw ResponseError.of("Can't save, this product is already exist", StatusCode.BAD_REQUEST);
    }

    await cartProductsRepository.save(cartProduct);
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.update = async (cartProduct) => {
  try {
    const storedCart = await cartService.getByUserId(cartProduct.customerId);

    if (!storedCart) {
      throw ResponseError.of("Can't update, this user does not exist", StatusCode.BAD_REQUEST);
    }

    cartProduct.cartId = storedCart.id;
    const storedCartProduct = await this.searchOne({ cartId: cartProduct.cartId, userId: cartProduct.userId, productId: cartProduct.productId });

    if (!storedCartProduct) {
      throw ResponseError.of("Can't update, this product does not exist on the cart", StatusCode.BAD_REQUEST);
    }

    await cartProductsRepository.update(cartProduct);
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.delete = async (cartProduct) => {
  try {
    const storedCart = await cartService.getByUserId(cartProduct.customerId);

    if (!storedCart) {
      throw ResponseError.of("Can't delete, this user does not exist", StatusCode.BAD_REQUEST);
    }

    cartProduct.cartId = storedCart.id;
    const storedCartProduct = await this.searchOne({ cartId: cartProduct.cartId, userId: cartProduct.userId, productId: cartProduct.productId });

    if (!storedCartProduct) {
      throw ResponseError.of("Can't delete, this product does not exist on the cart", StatusCode.BAD_REQUEST);
    }

    await cartProductsRepository.delete(cartProduct);
  } catch (error) {
    throw ResponseError.from(error);
  }
};
