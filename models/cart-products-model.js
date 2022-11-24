const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize-config");

const CartItem = sequelize.define(
  "cart_item",
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

CartItem.removeAttribute("id");
module.exports = CartItem;
