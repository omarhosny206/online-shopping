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

exports.search = async (searchCritreia) => {
  try {
    const users = await userRepository.search(searchCritreia);
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

exports.getRoles = async (id) => {
  try {
    const roles = await userRepository.getRoles(id);
    return roles;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.save = async (user) => {
  try {
    await userRepository.save(user);
  } catch (error) {
    throw ResponseError.from(error);
  }
};
