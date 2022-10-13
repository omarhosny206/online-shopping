const userProductsRepository = require("../repositories/user-products-repository");
const userService = require("../services/user-service");
const productService = require("../services/product-service");
const ResponseError = require("../utils/response-error");
const StatusCode = require("../utils/status-code");

exports.getAll = async () => {
  try {
    const userProducts = await userProductsRepository.getAll();
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
    const storedUser = await userService.getById(userProduct.userId);
    const storedProduct = await productService.getById(userProduct.productId);

    if (!storedUser) {
      throw ResponseError.of("Can't save, this user does not exist", StatusCode.BAD_REQUEST);
    }

    if (!storedProduct) {
      throw ResponseError.of("Can't save, this product does not exist", StatusCode.BAD_REQUEST);
    }

    await userProductsRepository.save(userProduct);
  } catch (error) {
    throw ResponseError.from(error);
  }
};
