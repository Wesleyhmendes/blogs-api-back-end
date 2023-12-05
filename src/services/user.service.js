const { User } = require('../models');

const validateUserService = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const validateNewUserService = async (id) => {
  const userExists = await User.findByPk(id);

  if (!userExists) return { message: 'User already registered' };

  return { message: 'SUCCESSFUL' };
};

module.exports = { 
  validateUserService,
  validateNewUserService,
};