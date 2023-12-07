const { BlogPost } = require('../models');
const { getPostByIdService } = require('./blogPost.show.service');

const updatePostService = async (newPost, postId, userId) => {
  const validatePost = await BlogPost.findByPk(postId);

  if (validatePost.id !== userId) return { status: 401, message: 'Unauthorized user' };
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

  console.log(validatePost);

  if (!validatePost) return { status: 404, message: 'Post does not exist' };
  if (validatePost.user_id !== userId) return { status: 401, message: 'Unauthorized user' };

  await BlogPost.destroy({ where: { id: postId } });

  return { status: 204 };
};

module.exports = {
  updatePostService,
  deletePostByIdService,
};