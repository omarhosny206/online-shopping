const User = require("../models/user-model");
const Role = require("../models/role-model");
const Category = require("../models/category-model");
const Product = require("../models/product-model");
const UserProduct = require("../models/user-products-model");
const Order = require("../models/order-model");
const OrderItem = require("../models/order-products-model");
const Cart = require("../models/cart-model");
const CartItem = require("../models/cart-products-model");

const tables = Object.freeze({
  user: User,
  role: Role,
  category: Category,
  product: Product,
  userProduct: UserProduct,
  order: Order,
  orderItem: OrderItem,
  cart: Cart,
  cartItem: CartItem,
});

module.exports = tables;
