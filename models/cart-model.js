const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize-config");

const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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

module.exports = Cart;
