const tables = require("../utils/tables");
const ApiError = require("../utils/api-error");

const Product = tables.product;
const Category = tables.category;

exports.getAll = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getById = async (id) => {
  try {
    const product = await Product.findByPk(id);
    return product;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const predicate = { where: { ...searchAllCriteria } };
    const product = await Product.findOne(predicate);
    return product;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getCategory = async (id) => {
  const product = await Product.findByPk(id, { include: [Category], raw: false });

  if (!product) {
    return null;
  }

  const category = product.category.name;
  return category;
};

exports.save = async (product) => {
  try {
    const storedProduct = await Product.create(product);
    return storedProduct;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.update = async (product) => {
  try {
    const predicate = { where: { id: product.id } };
    await Product.update(product, predicate);
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.delete = async (id) => {
  try {
    const predicate = { where: { id: id } };
    await Product.destroy(predicate);
  } catch (error) {
    throw ApiError.from(error);
  }
};
