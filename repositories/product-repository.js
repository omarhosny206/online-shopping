const tables = require("../utils/tables");
const ResponseError = require("../utils/response-error");

const Product = tables.product;
const Category = tables.category;

exports.getAll = async () => {
  try {
    const products = await Product.findAll();
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

exports.search = async (searchCriteria) => {
  try {
    const predicate = { where: { ...searchCriteria } };
    const products = await Product.findOne(predicate);
    return products;
  } catch (error) {
    throw ResponseError.from(error);
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
    const savedProduct = await Product.create(product);
    return savedProduct;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.update = async (product) => {
  try {
    const predicate = { where: { id: product.id } };
    await Product.update(product, predicate);
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.delete = async (id) => {
  try {
    const predicate = { where: { id: id } };
    await Product.destroy(predicate);
  } catch (error) {
    throw ResponseError.from(error);
  }
};
