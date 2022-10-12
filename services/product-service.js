const productRepository = require("../repositories/product-repository");
const categoryService = require("./category-service");
const ResponseError = require("../utils/response-error");
const StatusCode = require("../utils/status-code");

exports.getAll = async () => {
  try {
    const products = await productRepository.getAll();
    return products;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.search = async (searchCritreia) => {
  try {
    const products = await productRepository.search(searchCritreia);
    return products;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getById = async (id) => {
  try {
    const product = await productRepository.getById(id);
    return product;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.getByName = async (name) => {
  try {
    const product = await productRepository.getByName(name);
    return product;
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.save = async (product) => {
  try {
    const category = await categoryService.search({ name: product.categoryName });

    if (!category) {
      throw ResponseError.of("Can't save, this category does not exist", StatusCode.BAD_REQUEST);
    }

    const storedProduct = await this.search({ name: product.name });

    if (storedProduct) {
      throw ResponseError.of("Can't save, this product is already exist", StatusCode.BAD_REQUEST);
    }

    product.categoryId = category.id;
    await productRepository.save(product);
  } catch (error) {
    throw ResponseError.from(error);
  }
};
