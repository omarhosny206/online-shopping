const cartItemService = require("../services/cart-item-service");
const productService = require("../services/product-service");
const userService = require("../services/user-service");
const userProductService = require("../services/user-product-service");

const tables = require("../utils/tables");
const ApiError = require("../utils/api-error");

const Cart = tables.cart;
const User = tables.user;

exports.getById = async (id) => {
  try {
    const cart = await Cart.findByPk(id);
    return cart;
  } catch (error) {
    throw ApiError.from(error);
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
    throw ApiError.from(error);
  }
};

exports.getByUserId = async (userId) => {
  try {
    const predicate = { where: { userId: userId } };
    const cart = await Cart.findOne(predicate);
    return cart;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getInfo = async (cart) => {
  try {
    const cartItem = await cartItemService.searchAll({ cartId: cart.id });
    let price = 0;

    const details = await Promise.all(
      cartItem.map(async (cartItem) => {
        let product = productService.getById(cartItem.productId);
        let seller = userService.getById(cartItem.userId);
        let customer = this.getUser(cartItem.cartId);
        let userProduct = userProductService.searchAll({ userId: cartItem.userId, productId: cartItem.productId });

        [product, seller, customer, userProduct] = await Promise.all([product, seller, customer, userProduct]);

        price += userProduct.price * cartItem.quantity;

        return {
          customerName: `${customer.firstName} ${customer.lastName}`,
          sellerName: `${seller.firstName} ${seller.lastName}`,
          productName: product.name,
          productPrice: userProduct.price,
          quantity: cartItem.quantity,
          totalPrice: userProduct.price * cartItem.quantity,
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
    const cart = { userId: userId };
    const storedCart = await Cart.create(cart);
    return storedCart;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.clear = async (cart) => {
  try {
    await cartItemService.clear(cart.id);
  } catch (error) {
    throw ApiError.from(error);
  }
};
