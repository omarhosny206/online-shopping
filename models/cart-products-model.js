const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize-config");

const CartProducts = sequelize.define(
  "cart_products",
  {
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    underscored: true,
  }
);

CartProducts.removeAttribute("id");
module.exports = CartProducts;
