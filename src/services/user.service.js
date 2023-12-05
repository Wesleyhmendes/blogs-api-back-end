const { User } = require('../models');

const validateUserService = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

module.exports = { 
  validateUserService,
};