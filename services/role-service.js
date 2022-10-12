const roleRepository = require("../repositories/role-repository");
const ResponseError = require("../utils/response-error");

exports.getAll = async () => {
  try {
    const roles = await roleRepository.getAll();
    return roles;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.search = async (searchCritreia) => {
  try {
    const role = await roleRepository.search(searchCritreia);
    return role;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getById = async (id) => {
  try {
    const role = await roleRepository.getById(id);
    return role;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getUsers = async (name) => {
  try {
    const users = await roleRepository.getUsers(name);
    return users;
  } catch (error) {
    throw ResponseError.from(error);
  }
};
