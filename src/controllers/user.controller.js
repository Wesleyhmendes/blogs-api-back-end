const jwt = require('jsonwebtoken');
const service = require('../services/user.service');

const validateUserController = async (req, res) => {
  const { email } = req.body;
  
  const user = await service.validateUserService(email);
  
  const token = jwt.sign({
    sub: user.id,
    role: 'user',
  }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  
  return res.status(200).json({ token });
};

const validateNewUserController = async (req, res) => {
  const newUser = await service.validateNewUserService(res.locals.user.id);

  if (newUser.message === 'User already registered') {
    return res.status(409).json(newUser);
  }

  return newUser;
};

module.exports = { 
  validateUserController,
  validateNewUserController,
};