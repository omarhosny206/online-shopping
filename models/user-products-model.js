const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize-config");

const UserProduct = sequelize.define(
  "user_product",
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

module.exports = UserProduct;
