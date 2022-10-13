const tables = require("../utils/tables");
const ResponseError = require("../utils/response-error");

const Category = tables.category;

exports.getAll = async () => {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getById = async (id) => {
  try {
    const category = await Category.findByPk(id);
    return category;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.search = async (searchCritreia) => {
  try {
    const predicate = { where: { ...searchCritreia } };
    const category = await Category.findOne(predicate);
    return category;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.save = async (category) => {
  try {
    const savedCategory = await Category.create(category);
    return savedCategory;
  } catch (error) {
    throw ResponseError.from(error);
  }
};
