const cartProductsService = require("../services/cart-products-service");
const productService = require("../services/product-service");
const userService = require("../services/user-service");
const userProductsService = require("../services/user-products-service");

const tables = require("../utils/tables");
const ResponseError = require("../utils/response-error");

const Cart = tables.cart;
const User = tables.user;

exports.getById = async (id) => {
  try {
    const cart = await Cart.findByPk(id);
    return cart;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getUser = async (id) => {
  try {
    const cart = await Cart.findByPk(id, { include: [User], raw: false });

    if (!cart) {
      return null;
    }

    const user = cart.user;
    return user;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getByUserId = async (userId) => {
  try {
    const predicate = { where: { userId: userId } };
    const cart = await Cart.findOne(predicate);
    return cart;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getInfo = async (cart) => {
  try {
    const cartProducts = await cartProductsService.searchAll({ cartId: cart.id });

    const info = await Promise.all(
      cartProducts.map(async (cartProduct) => {
        let product = productService.getById(cartProduct.productId);
        let seller = userService.getById(cartProduct.userId);
        let customer = this.getUser(cartProduct.cartId);
        let userProduct = userProductsService.searchAll({ userId: cartProduct.userId, productId: cartProduct.productId });

        [product, seller, customer, userProduct] = await Promise.all([product, seller, customer, userProduct]);

        return {
          customer: `${customer.firstName} ${customer.lastName}`,
          seller: `${seller.firstName} ${seller.lastName}`,
          product: product.name,
          price: userProduct.price,
          quantity: cartProduct.quantity,
          totalPrice: userProduct.price * cartProduct.quantity,
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
    const cart = { userId: userId };
    const storedCart = await Cart.create(cart);
    return storedCart;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.clear = async (cart) => {
  try {
    await cartProductsService.clear(cart.id);
  } catch (error) {
    throw ResponseError.from(error);
  }
};
