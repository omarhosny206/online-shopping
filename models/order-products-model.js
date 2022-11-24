const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize-config");

const OrderItem = sequelize.define(
  "order_item",
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

OrderItem.removeAttribute("id");
module.exports = OrderItem;
