const serviceCreate = require('../services/blogPost.show.service');
const serviceHandle = require('../services/blogPost.handle.service');

const createNewPostController = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = res.locals.user;
  const newPost = await serviceCreate.createNewPostService(title, content, categoryIds, id);
  if (newPost.message) return res.status(400).json(newPost);
  return res.status(201).json(newPost);
};

const getAllPostsController = async (req, res) => {
  const allPosts = await serviceCreate.getAllPostsService(res.locals.user);
  return res.status(200).json(allPosts);
};

const getPostByIdController = async (req, res) => {
  const { id } = req.params;
  const post = await serviceCreate.getPostByIdService(id);
  if (post.message) return res.status(404).json(post);
  return res.status(200).json(post);
};

const updatePostController = async (req, res) => {
  const newPost = req.body;
  const { id } = req.params;
  const userId = res.locals.user.id;
  const updatedPost = await serviceHandle.updatePostService(newPost, id, userId);
  const { status, message } = updatedPost;
  if (message) return res.status(status).json({ message });
  return res.status(200).json(updatedPost);
};

const deletePostByIdController = async (req, res) => {
  const { id } = req.params;
  const userId = res.locals.user.id;
  const result = await serviceHandle.deletePostByIdService(id, userId);
  if (result.message) return res.status(result.status).json({ message: result.message });
  return res.status(204).end();
};

const searchPostsController = async (req, res) => {
  const { q } = req.query;
  const result = await serviceHandle.searchPostsService(q);

  return res.status(200).json(result);
};

module.exports = {
  createNewPostController,
  getAllPostsController,
  getPostByIdController,
  updatePostController,
  deletePostByIdController,
  searchPostsController,
};