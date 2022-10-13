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

exports.getById = async (id) => {
  try {
    const product = await productRepository.getById(id);
    return product;
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

exports.getCategory = async (id) => {
  try {
    const category = await productRepository.getCategory(id);
    return category;
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

exports.update = async (product) => {
  try {
    const storedProduct = await this.getById(product.id);
    const storedCategory = await categoryService.search({ name: product.categoryName });

    if (!storedProduct) {
      throw ResponseError.of("Can't update, this product does not exist", StatusCode.BAD_REQUEST);
    }

    if (!storedCategory) {
      throw ResponseError.of("Can't update, this category does not exist", StatusCode.BAD_REQUEST);
    }

    product.categoryId = storedCategory.id;
    await productRepository.update(product);
  } catch (error) {
    throw ResponseError.from(error);
  }
};

exports.delete = async (id) => {
  try {
    const storedProduct = await this.getById(id);

    if (!storedProduct) {
      throw ResponseError.of("Can't delete, this product does not exist", StatusCode.BAD_REQUEST);
    }

    await productRepository.delete(id);
  } catch (error) {
    throw ResponseError.from(error);
  }
};
