const service = require('../services/blog.service');

const createNewPostController = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = res.locals.user;

  const newPost = await service.createNewPostService(title, content, categoryIds, id);

  if (newPost.message) return res.status(400).json(newPost);

  return res.status(201).json(newPost);
};

module.exports = {
  createNewPostController,
};