const roleRepository = require("../repositories/role-repository");
const ResponseError = require("../utils/response-error");
const StatusCode = require("../utils/status-code");

exports.getAll = async () => {
  try {
    const roles = await roleRepository.getAll();
    return roles;
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

exports.searchAll = async (searchAllCriteria) => {
  try {
    const role = await roleRepository.searchAll(searchAllCriteria);
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

exports.save = async (role) => {
  try {
    const storedRole = await this.searchAll({ name: role.name });

    if (storedRole) {
      throw ResponseError.of("Can't save, this role is already exist", StatusCode.BAD_REQUEST);
    }

    await roleRepository.save(role);
  } catch (error) {
    throw ResponseError.from(error);
  }
};
