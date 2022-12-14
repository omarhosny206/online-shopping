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

exports.getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const role = await roleService.getById(id);
    return res.status(StatusCode.OK).json(role);
  } catch (error) {
    return next(error);
  }
};

exports.searchAll = async (req, res, next) => {
  try {
    const searchAllCriteria = req.query;
    const role = await roleService.searchOne(searchAllCriteria);
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

exports.save = async (req, res, next) => {
  try {
    const role = req.body;
    await roleService.save(role);
    return res.status(StatusCode.CREATED).json({ message: "Created successfully" });
  } catch (error) {
    return next(error);
  }
};
