const orderService = require("../services/order-service");
const StatusCode = require("../utils/status-code");

exports.getById = async (req, res, next) => {
  try {
    const order = await orderService.getById(id);
    return res.status(StatusCode.OK).json(order);
  } catch (error) {
    return next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await orderService.getUser(id);
    return res.status(StatusCode.OK).json(user);
  } catch (error) {
    return next(error);
  }
};

exports.getByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const order = await orderService.getByUserId(userId);
    return res.status(StatusCode.OK).json(order);
  } catch (error) {
    return next(error);
  }
};

exports.getInfo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    order = { userId: userId };
    const info = await orderService.getInfo(order);
    return res.status(StatusCode.OK).json(info);
  } catch (error) {
    return next(error);
  }
};

exports.save = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await orderService.save(userId);
    return res.status(StatusCode.CREATED).json({ message: "Created successfully" });
  } catch (error) {
    return next(error);
  }
};
