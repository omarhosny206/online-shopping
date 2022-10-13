const tables = require("../utils/tables");
const ResponseError = require("../utils/response-error");

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

exports.search = async (searchCritreia) => {
  try {
    const predicate = { where: { ...searchCritreia } };
    const users = await User.findAll(predicate);
    return users;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getRole = async (id) => {
  try {
    const user = await User.findByPk(id, { include: [Role], raw: false });

    if (!user) {
      return null;
    }

    const role = user.role.name;
    return role;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.save = async (user) => {
  try {
    const savedUser = await User.create(user);
    return savedUser;
  } catch (error) {
    throw ResponseError.from(error);
  }
};
