const { Category } = require('../models');

const createNewCategoryService = async (name) => (Category.create({ name }));

const getAllCategoriesService = async () => {
  const categories = await Category.findAll();

  return categories;
};

module.exports = {
  createNewCategoryService,
  getAllCategoriesService,
};