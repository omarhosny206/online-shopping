const tables = require("../utils/tables");

exports.create = () => {
  tables.user.belongsTo(tables.role, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.role.hasMany(tables.user);

  tables.product.belongsTo(tables.category, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.category.hasMany(tables.product);

  tables.user.belongsToMany(tables.product, { through: tables.userProduct });
  tables.product.belongsToMany(tables.user, { through: tables.userProduct });

  tables.order.belongsTo(tables.user, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.user.hasMany(tables.order);

  tables.cart.belongsTo(tables.user, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.user.hasMany(tables.cart);

  tables.orderItem.belongsTo(tables.product, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.product.hasMany(tables.orderItem);

  tables.orderItem.belongsTo(tables.user, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.user.hasMany(tables.orderItem);

  tables.orderItem.belongsTo(tables.order, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.order.hasMany(tables.orderItem);

  tables.cartItem.belongsTo(tables.product, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.product.hasMany(tables.cartItem);

  tables.cartItem.belongsTo(tables.user, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.user.hasMany(tables.cartItem);

  tables.cartItem.belongsTo(tables.cart, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.cart.hasMany(tables.cartItem);
};
