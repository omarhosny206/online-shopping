const tables = require("../utils/tables");
const ResponseError = require("../utils/response-error");

const Product = tables.product;

exports.getAll = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.search = async (searchCritreia) => {
  try {
    const predicate = { where: { ...searchCritreia } };
    const products = await Product.findOne(predicate);
    return products;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getById = async (id) => {
  try {
    const product = await Product.findByPk(id);
    return product;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getByName = async (name) => {
  try {
    const predicate = { where: { name: name } };
    const product = await Product.findOne(predicate);
    return product;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.save = async (product) => {
  try {
    await Product.create(product);
  } catch (error) {
    throw ResponseError.from(error);
  }
};
