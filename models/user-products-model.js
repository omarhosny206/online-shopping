const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize-config");

const UserProducts = sequelize.define(
  "user_products",
  {
    price: {
      type: Sequelize.DOUBLE,
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

module.exports = UserProducts;
