const express = require('express');

const authMiddleware = require('./middlewares/auth.middleware');
const validateUserFiled = require('./middlewares/validateUserFiled.middleware');
const validateNewUser = require('./middlewares/validateNewUser.middleware');
const validatePostFields = require('./middlewares/validatePostFields.middleware');

const userController = require('./controllers/user.controller');
const categoryController = require('./controllers/category.controller');
const blogController = require('./controllers/blog.controller');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...
app.post('/login', validateUserFiled, userController.validateUserController);

app.post('/user', validateNewUser, userController.validateNewUserController);

app.get('/user', authMiddleware, userController.getUsersController);

app.get('/user/:id', authMiddleware, userController.getUserByIdController);

app.post('/categories', authMiddleware, categoryController.createNewCategoryController);

app.get('/categories', authMiddleware, categoryController.getAllCategoriesController);

app.post('/post', authMiddleware, validatePostFields, blogController.createNewPostController);

app.get('/post', authMiddleware, blogController.getAllPostsController);

app.get('/post/:id', authMiddleware, blogController.getPostByIdController);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
