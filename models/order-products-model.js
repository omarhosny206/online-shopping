const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize-config");

const OrderProducts = sequelize.define(
  "order_products",
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

OrderProducts.removeAttribute("id");
module.exports = OrderProducts;
