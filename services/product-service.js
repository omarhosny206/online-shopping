const productRepository = require("../repositories/product-repository");
const ApiError = require("../utils/api-error");
const categoryService = require("./category-service");

exports.getAll = async () => {
  try {
    const products = await productRepository.getAll();
    return products;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getById = async (id) => {
  try {
    const product = await productRepository.getById(id);
    return product;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchOne = async (searchAllCriteria) => {
  try {
    const product = await productRepository.searchOne(searchAllCriteria);
    return product;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getCategory = async (id) => {
  try {
    const category = await productRepository.getCategory(id);
    return category;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (product) => {
  try {
    const category = await categoryService.searchAll({ name: product.categoryName });

    if (!category) {
      throw ApiError.badRequest("Can't save, this category does not exist");
    }

    const storedProduct = await this.searchOne({ name: product.name });

    if (storedProduct) {
      throw ApiError.badRequest("Can't save, this product is already exist");
    }

    product.categoryId = category.id;
    await productRepository.save(product);
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.update = async (product) => {
  try {
    const storedProduct = await this.getById(product.id);
    const storedCategory = await categoryService.searchAll({ name: product.categoryName });

    if (!storedProduct) {
      throw ApiError.badRequest("Can't update, this product does not exist");
    }

    if (!storedCategory) {
      throw ApiError.badRequest("Can't update, this category does not exist");
    }

    product.categoryId = storedCategory.id;
    await productRepository.update(product);
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.delete = async (id) => {
  try {
    const storedProduct = await this.getById(id);

    if (!storedProduct) {
      throw ApiError.badRequest("Can't delete, this product does not exist");
    }

    await productRepository.delete(id);
  } catch (error) {
    throw ApiError.from(error);
  }
};
