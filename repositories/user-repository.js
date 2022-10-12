const tables = require("../utils/tables");
const ResponseError = require("../utils/response-error");
const StatusCode = require("../utils/status-code");

const Role = tables.role;
const User = tables.user;

exports.getAll = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.search = async (searchCritreia) => {
  try {
    const predicate = { where: { ...searchCritreia } };
    const users = await User.findAll(predicate);
    return users;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getById = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getByEmail = async (email) => {
  try {
    const predicate = { where: { email: email } };
    const user = await User.findOne(predicate);
    return user;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getRoles = async (id) => {
  try {
    const user = await User.findByPk(id, { include: [Role], raw: false });

    if (!user) {
      return [];
    }

    const roles = user.roles.map((role) => role.name);
    return roles;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.save = async (user) => {
  try {
    await User.create(user);
  } catch (error) {
    throw ResponseError.from(error);
  }
};
