const categoryService = require('../services/categories.service');

const createNewCategoryController = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  const newCategory = await categoryService.createNewCategoryService(name);
  return res.status(201).json(newCategory);
};

const getAllCategoriesController = async (_req, res) => {
  const categories = await categoryService.getAllCategoriesService();

  return res.status(200).json(categories);
};

module.exports = {
  createNewCategoryController,
  getAllCategoriesController,
};