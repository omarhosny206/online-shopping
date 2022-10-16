const tables = require("../utils/tables");
const ResponseError = require("../utils/response-error");

const CartProducts = tables.cartProducts;

exports.getAll = async () => {
  try {
    const cartProducts = await CartProducts.findAll();
    return cartProducts;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.searchAll = async (searchAllCriteria) => {
  try {
    const predicate = { where: { ...searchAllCriteria } };
    const cartProducts = await CartProducts.findAll(predicate);
    return cartProducts;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const predicate = { where: { ...searchAllCriteria } };
    const cartProduct = await CartProducts.findOne(predicate);
    return cartProduct;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getProductsById = async (id) => {
  try {
    const predicate = { where: { userId: id } };
    const userProducts = await UserProducts.findAll(predicate);

    const products = await Promise.all(
      userProducts.map(async (userProduct) => {
        const product = await productService.getById(userProduct.productId);
        return { product: product.name, price: userProduct.price };
      })
    );

    return products;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.save = async (cartProduct) => {
  try {
    const savedCartProduct = await CartProducts.create(cartProduct);
    return savedCartProduct;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.update = async (cartProduct) => {
  try {
    const predicate = { where: { cartId: cartProduct.cartId, userId: cartProduct.userId, productId: cartProduct.productId } };
    await CartProducts.update(cartProduct, predicate);
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.delete = async (cartProduct) => {
  try {
    const predicate = { where: { cartId: cartProduct.cartId, userId: cartProduct.userId, productId: cartProduct.productId } };
    await CartProducts.destroy(predicate);
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.clear = async (cartId) => {
  try {
    const predicate = { where: { cartId: cartId } };
    await CartProducts.destroy(predicate);
  } catch (error) {
    throw ResponseError.from(error);
  }
};
