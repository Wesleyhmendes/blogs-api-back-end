const { PostCategory, BlogPost, Category } = require('../models');

const createNewPostService = async (title, content, categoryIds, id) => {
  const validateCategoryId = await categoryIds.map((category) => Category.findByPk(category));

  const response = await Promise.all(validateCategoryId);
  const error = response.some((category) => category === null);

  if (error) return { message: 'one or more "categoryIds" not found' };

  const newPost = await BlogPost.create({ title, content, userId: id });

  // await categoryIds.forEach((category) => PostCategory
  //   .create({ postId: newPost.id, categoryId: category }));

  await PostCategory.bulkCreate(categoryIds
    .map((categoryId) => ({ postId: newPost.id, categoryId })));

  return newPost;
};

module.exports = {
  createNewPostService,
};