const roleRepository = require("../repositories/role-repository");
const ApiError = require("../utils/api-error");

exports.getAll = async () => {
  try {
    const roles = await roleRepository.getAll();
    return roles;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getById = async (id) => {
  try {
    const role = await roleRepository.getById(id);
    return role;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const role = await roleRepository.searchOne(searchAllCriteria);
    return role;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getUsers = async (name) => {
  try {
    const users = await roleRepository.getUsers(name);
    return users;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (role) => {
  try {
    const storedRole = await this.searchAll({ name: role.name });

    if (storedRole) {
      throw ApiError.badRequest("Can't save, this role is already exist");
    }

    await roleRepository.save(role);
  } catch (error) {
    throw ApiError.from(error);
  }
};
