const User = require("../models/user-model");
const Role = require("../models/role-model");
const Category = require("../models/category-model");
const Product = require("../models/product-model");
const UserProducts = require("../models/user-products-model");
const Order = require("../models/order-model");
const OrderProducts = require("../models/order-products-model");
const Cart = require("../models/cart-model");
const CartProducts = require("../models/cart-products-model");

const tables = Object.freeze({
  user: User,
  role: Role,
  category: Category,
  product: Product,
  userProducts: UserProducts,
  order: Order,
  orderProducts: OrderProducts,
  cart: Cart,
  cartProducts: CartProducts,
});

module.exports = tables;
