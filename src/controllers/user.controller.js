const jwt = require('jsonwebtoken');
const service = require('../services/user.service');

const validateUserController = async (req, res) => {
  const { email } = req.body;
  
  const user = service.validateUserService(email);
  
  const token = jwt.sign({
    sub: user.id,
    role: 'user',
  }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  
  return res.status(200).json({ token });
};

module.exports = { 
  validateUserController,
};