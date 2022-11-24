const tables = require("../utils/tables");
const ApiError = require("../utils/api-error");

const CartItem = tables.cartItem;

exports.getAll = async () => {
    try {
        const cartItem = await cartItem.findAll();
        return cartItem;
    } catch (error) {
        throw ApiError.from(error);
    }
};

exports.searchAll = async (searchAllCriteria) => {
    try {
        const predicate = {where: {...searchAllCriteria}};
        const cartItem = await CartItem.findAll(predicate);
        return cartItem;
    } catch (error) {
        throw ApiError.from(error);
    }
};

exports.searchOne = async (searchAllCriteria) => {
    try {
        const predicate = {where: {...searchAllCriteria}};
        const cartItem = await CartItem.findOne(predicate);
        return cartItem;
    } catch (error) {
        throw ApiError.from(error);
    }
};

exports.save = async (cartItem) => {
    try {
        const storedcartItem = await CartItem.create(cartItem);
        return storedcartItem;
    } catch (error) {
        throw ApiError.from(error);
    }
};

exports.update = async (cartItem) => {
    try {
        const predicate = {where: {cartId: cartItem.cartId, userId: cartItem.userId, productId: cartItem.productId}};
        await CartItem.update(cartItem, predicate);
    } catch (error) {
        throw ApiError.from(error);
    }
};

exports.delete = async (cartItem) => {
    try {
        const predicate = {where: {cartId: cartItem.cartId, userId: cartItem.userId, productId: cartItem.productId}};
        await CartItem.destroy(predicate);
    } catch (error) {
        throw ApiError.from(error);
    }
};

exports.clear = async (cartId) => {
    try {
        const predicate = {where: {cartId: cartId}};
        await CartItem.destroy(predicate);
    } catch (error) {
        throw ApiError.from(error);
    }
};
