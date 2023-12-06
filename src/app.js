const express = require('express');
const authMiddleware = require('./middlewares/auth.middleware');
const validateUserFiled = require('./middlewares/validateUserFiled.middleware');
const validateNewUser = require('./middlewares/validateNewUser.middleware');
const controller = require('./controllers/user.controller');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...
app.post('/login', validateUserFiled, controller.validateUserController);

app.post('/user', validateNewUser, controller.validateNewUserController);

app.get('/user', authMiddleware, controller.getUsersController);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
