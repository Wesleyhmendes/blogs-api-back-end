const { Op } = require('sequelize');
const { BlogPost, Category, PostCategory, User } = require('../models');
const { getPostByIdService, getAllPostsService } = require('./blogPost.show.service');

const updatePostService = async (newPost, postId, userId) => {
  const validatePost = await BlogPost.findByPk(postId);

  if (validatePost.user_id !== userId) return { status: 401, message: 'Unauthorized user' };
  if (!newPost.title || !newPost.content) {
    return { status: 400, message: 'Some required fields are missing' };
  }

  const { title, content } = newPost;
  await BlogPost.update({ title, content }, { where: { id: postId } });
  const result = await getPostByIdService(userId);

  return result;
};

const deletePostByIdService = async (postId, userId) => {
  const validatePost = await BlogPost.findByPk(postId);

  if (!validatePost) return { status: 404, message: 'Post does not exist' };
  if (validatePost.user_id !== userId) return { status: 401, message: 'Unauthorized user' };

  await BlogPost.destroy({ where: { id: postId } });

  return { status: 204 };
};

const searchPostsService = async (q) => {
  if (!q) {
    const response = await getAllPostsService();
    return response;
  }

  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category,
        as: 'categories', 
        through: { model: PostCategory, as: 'posts_categories', attributes: [] },
      }],
    attributes: { exclude: ['user_id'] },
    where: { [Op.or]: [{ title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } }] },
  });
    
  if (!result.length) return [];
  return result;
};

module.exports = {
  updatePostService,
  deletePostByIdService,
  searchPostsService,
};