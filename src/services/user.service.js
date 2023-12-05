const { User } = require('../models');

const validateUserService = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const validateNewUserService = async (userInfos) => {
  const { displayName, email, password, image } = userInfos;
  const userExists = await User.findOne({ where: { email } });

  if (userExists) return { message: 'User already registered' };

  try {
    return User.create({ displayName, email, password, image });
  } catch (error) {
    return ({ message: 'Erro ao cadastrar uma conta!' });
  }
};

module.exports = { 
  validateUserService,
  validateNewUserService,
};