const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('./models');
// const authMiddleware = require('./middlewares/auth.middleware');
const validateUserFiled = require('./middlewares/validateUserFiled.middleware');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...
app.post('/login', validateUserFiled, async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  const token = jwt.sign({
    sub: user.id,
    role: 'user',
  }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  return res.status(200).json({ token });
});

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
