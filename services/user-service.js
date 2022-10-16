const userRepository = require("../repositories/user-repository");
const ResponseError = require("../utils/response-error");

exports.getAll = async () => {
  try {
    const users = await userRepository.getAll();
    return users;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getById = async (id) => {
  try {
    const user = await userRepository.getById(id);
    return user;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getByEmail = async (email) => {
  try {
    const user = await userRepository.getByEmail(email);
    return user;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.searchAll = async (searchAllCriteria) => {
  try {
    const users = await userRepository.searchAll(searchAllCriteria);
    return users;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getRole = async (id) => {
  try {
    const role = await userRepository.getRole(id);
    return role;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.save = async (user) => {
  try {
    const storedUser = await userRepository.save(user);
    return storedUser;
  } catch (error) {
    throw ResponseError.from(error);
  }
};
