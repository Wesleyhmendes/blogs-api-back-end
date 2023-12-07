const service = require('../services/blog.service');

const createNewPostController = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = res.locals.user;

  const newPost = await service.createNewPostService(title, content, categoryIds, id);

  if (newPost.message) return res.status(400).json(newPost);

  return res.status(201).json(newPost);
};

const getAllPostsController = async (req, res) => {
  const allPosts = await service.getAllPostsService(res.locals.user);

  return res.status(200).json(allPosts);
};

const getPostByIdController = async (req, res) => {
  const { id } = req.params;
  const post = await service.getPostByIdService(id);

  if (post.message) return res.status(404).json(post);

  return res.status(200).json(post);
};

const updatePostController = async (req, res) => {
  const newPost = req.body;
  const { id } = req.params;
  const userId = res.locals.user.id;

  const updatedPost = await service.updatePostService(newPost, id, userId);
  const { status, message } = updatedPost;

  if (message) return res.status(status).json({ message });
  
  return res.status(200).json(updatedPost);
};

module.exports = {
  createNewPostController,
  getAllPostsController,
  getPostByIdController,
  updatePostController,
};