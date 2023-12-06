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
    const result = await User.create({ displayName, email, password, image });

    return result;
  } catch (error) {
    return ({ message: 'Erro ao cadastrar uma conta!' });
  }
};

const getUsersService = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};

const getUSerByIdService = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  if (!user) return { message: 'User does not exist' };

  return user;
};

module.exports = { 
  validateUserService,
  validateNewUserService,
  getUsersService,
  getUSerByIdService,
};