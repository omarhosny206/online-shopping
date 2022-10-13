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
    const cartProducts = await cartProductsService.search({ cartId: cart.id });

    const info = await Promise.all(
      cartProducts.map(async (cartProduct) => {
        let product = productService.getById(cartProduct.productId);
        let user = userService.getById(cartProduct.userId);
        let userProduct = userProductsService.search({ userId: cartProduct.userId, productId: cartProduct.productId });

        [product, user, userProduct] = await Promise.all([product, user, userProduct]);

        return {
          user: `${user.firstName} ${user.lastName}`,
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
    const savedCart = await Cart.create(cart);
    return savedCart;
  } catch (error) {
    throw ResponseError.from(error);
  }
};
