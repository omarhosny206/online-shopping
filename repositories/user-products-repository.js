const tables = require("../utils/tables");
const ResponseError = require("../utils/response-error");

const UserProducts = tables.userProducts;
const User = tables.user;
const Product = tables.product;

exports.getAll = async () => {
  try {
    const userProducts = await UserProducts.findAll();
    return userProducts;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

// exports.search = async (searchCritreia) => {
//   try {
//     const predicate = { where: { ...searchCritreia } };
//     const role = await Role.findOne(predicate);
//     return role;
//   } catch (error) {
//     throw ResponseError.from(error);
//   }
// };

// exports.getById = async (id) => {
//   try {
//     const role = await Role.findByPk(id);
//     return role;
//   } catch (error) {
//     throw ResponseError.from(error);
//   }
// };

// exports.getUsers = async (name) => {
//   try {
//     const predicate = { where: { name: name } };
//     const role = await Role.findOne({ ...predicate, include: [User], raw: false });

//     if (!role) {
//       return [];
//     }

//     const users = role.users;
//     return users;
//   } catch (error) {
//     throw ResponseError.from(error);
//   }
// };

exports.save = async (userProduct) => {
  try {
    const savedUserProduct = await UserProducts.create(userProduct);
  } catch (error) {
    throw ResponseError.from(error);
  }
};
