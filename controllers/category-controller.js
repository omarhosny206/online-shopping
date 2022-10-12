const categoryService = require("../services/category-service");
const StatusCode = require("../utils/status-code");

exports.getAll = async (req, res, next) => {
  try {
    const categories = await categoryService.getAll();
    return res.status(StatusCode.OK).json(categories);
  } catch (error) {
    return next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const searchCritreia = req.query;
    const category = await categoryService.search(searchCritreia);
    return res.status(StatusCode.OK).json(category);
  } catch (error) {
    return next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const category = await categoryService.getById(id);
    return res.status(StatusCode.OK).json(category);
  } catch (error) {
    return next(error);
  }
};

exports.save = async (req, res, next) => {
  try {
    const category = req.body;
    await categoryService.save(category);
    return res.status(StatusCode.CREATED).json({ message: "Created successfully" });
  } catch (error) {
    return next(error);
  }
};
