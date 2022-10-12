const userService = require("../services/user-service");
const StatusCode = require("../utils/status-code");
const ResponseError = require("../utils/response-error");

exports.getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    return res.status(StatusCode.OK).json(users);
  } catch (error) {
    return next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const searchCriteria = req.query;
    const users = await userService.search(searchCriteria);
    return res.status(StatusCode.OK).json(users);
  } catch (error) {
    return next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.getById(id);
    return res.status(StatusCode.OK).json(user);
  } catch (error) {
    return next(error);
  }
};

exports.getRoles = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const roles = await userService.getRoles(id);
    return res.status(StatusCode.OK).json(roles);
  } catch (error) {
    return next(error);
  }
};
