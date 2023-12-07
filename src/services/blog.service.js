/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
const { PostCategory, BlogPost, Category, User } = require('../models');

const createNewPostService = async (title, content, categoryIds, id) => {
  const validateCategoryId = await categoryIds.map((category) => Category.findByPk(category));

  const response = await Promise.all(validateCategoryId);
  const error = response.some((category) => category === null);

  if (error) return { message: 'one or more "categoryIds" not found' };

  const newPost = await BlogPost.create({ title, content, userId: id });

  await PostCategory.bulkCreate(categoryIds
    .map((categoryId) => ({ postId: newPost.id, categoryId })));

  return newPost;
};

// const findPostsInfos = async () => {
//   const posts = await BlogPost.findAll();
//   const users = await posts.map((post) => User.findByPk(post.user_id));
//   const categories = await posts.map((post) => Category.findByPk(post.id));

//   return { posts, users, categories };
// };

const getAllPostsService = async () => {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password'],
        },
      },
      {
        model: Category,
        as: 'categories',
        through: {
          model: PostCategory,
          as: 'posts_categories',
          attributes: [],
        },
      },
    ],
    attributes: {
      exclude: ['user_id'],
    },
  });

  return posts;
};

module.exports = {
  createNewPostService,
  getAllPostsService,
};