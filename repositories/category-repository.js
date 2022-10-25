const tables = require("../utils/tables");
const ApiError = require("../utils/api-error");

const Category = tables.category;
const Product = tables.product;

exports.getAll = async () => {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getById = async (id) => {
  try {
    const category = await Category.findByPk(id);
    return category;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getProducts = async (id) => {
  try {
    const category = await Category.findByPk(id, { include: [Product], raw: false });

    if (!category) {
      return [];
    }

    const products = category.products;
    return products;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const predicate = { where: { ...searchAllCriteria } };
    const category = await Category.findOne(predicate);
    return category;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (category) => {
  try {
    const storedCategory = await Category.create(category);
    return storedCategory;
  } catch (error) {
    throw ApiError.from(error);
  }
};
