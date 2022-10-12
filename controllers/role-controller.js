const roleService = require("../services/role-service");
const StatusCode = require("../utils/status-code");

exports.getAll = async (req, res, next) => {
  try {
    const roles = await roleService.getAll();
    return res.status(StatusCode.OK).json(roles);
  } catch (error) {
    return next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const searchCriteria = req.query;
    const role = await roleService.search(searchCriteria);
    return res.status(StatusCode.OK).json(role);
  } catch (error) {
    return next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { name } = req.params;
    const users = await roleService.getUsers(name);
    return res.status(StatusCode.OK).json(users);
  } catch (error) {
    return next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const role = await roleService.getById(id);
    return res.status(StatusCode.OK).json(role);
  } catch (error) {
    return next(error);
  }
};
