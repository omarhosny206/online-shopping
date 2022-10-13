const tables = require("../utils/tables");

exports.create = () => {
  tables.user.belongsTo(tables.role, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.role.hasMany(tables.user);

  tables.product.belongsTo(tables.category, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.category.hasMany(tables.product);

  tables.user.belongsToMany(tables.product, { through: tables.userProducts });
  tables.product.belongsToMany(tables.user, { through: tables.userProducts });

  tables.order.belongsTo(tables.user, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.user.hasMany(tables.order);

  tables.cart.belongsTo(tables.user, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.user.hasMany(tables.cart);

  tables.orderProducts.belongsTo(tables.product, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.product.hasMany(tables.orderProducts);

  tables.orderProducts.belongsTo(tables.user, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.user.hasMany(tables.orderProducts);

  tables.orderProducts.belongsTo(tables.order, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.order.hasMany(tables.orderProducts);

  tables.cartProducts.belongsTo(tables.product, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.product.hasMany(tables.cartProducts);

  tables.cartProducts.belongsTo(tables.user, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.user.hasMany(tables.cartProducts);

  tables.cartProducts.belongsTo(tables.cart, { constraints: true, onDelete: "CASCADE", foreignKey: { allowNull: false } });
  tables.cart.hasMany(tables.cartProducts);
};
