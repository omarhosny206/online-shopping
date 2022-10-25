const categoryRepository = require("../repositories/category-repository");
const ApiError = require("../utils/api-error");

exports.getAll = async () => {
  try {
    const categories = await categoryRepository.getAll();
    return categories;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getById = async (id) => {
  try {
    const category = await categoryRepository.getById(id);
    return category;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.getProducts = async (id) => {
  try {
    const products = await categoryRepository.getProducts(id);
    return products;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.searchAll = async (searchAllCriteria) => {
  try {
    const category = await categoryRepository.searchOne(searchAllCriteria);
    return category;
  } catch (error) {
    throw ApiError.from(error);
  }
};

exports.save = async (category) => {
  try {
    const storedCategory = await this.searchAll({ name: category.name });

    if (storedCategory) {
      throw ApiError.badRequest("Can't save, this category is already exist");
    }

    await categoryRepository.save(category);
  } catch (error) {
    throw ApiError.from(error);
  }
};
