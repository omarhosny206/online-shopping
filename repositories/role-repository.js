const tables = require("../utils/tables");
const ApiError = require("../utils/api-error");

const Role = tables.role;
const User = tables.user;

exports.getAll = async () => {
  try {
    const roles = await Role.findAll();
    return roles;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const predicate = { where: { ...searchAllCriteria } };
    const role = await Role.findOne(predicate);
    return role;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getById = async (id) => {
  try {
    const role = await Role.findByPk(id);
    return role;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getUsers = async (name) => {
  try {
    const predicate = { where: { name: name } };
    const role = await Role.findOne({ ...predicate, include: [User], raw: false });

    if (!role) {
      return [];
    }

    const users = role.users;
    return users;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (role) => {
  try {
    const storedRole = await Role.create(role);
    return storedRole;
  } catch (error) {
    throw ApiError.from(error);
  }
};
