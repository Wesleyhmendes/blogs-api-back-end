const jwt = require('jsonwebtoken');
const service = require('../services/user.service');

const validateUserController = async (req, res) => {
  const { email } = req.body;
  const user = await service.validateUserService(email);

  console.log(user);

  const token = jwt.sign({
    sub: user.id,
    role: 'user',
  }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  return res.status(200).json({ token });
};

const validateNewUserController = async (req, res) => {
  const userInfos = req.body;
  const newUser = await service.validateNewUserService(userInfos);

  if (newUser.message === 'User already registered') return res.status(409).json(newUser);
  const token = jwt.sign({ sub: newUser.id, role: 'user' }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  return res.status(201).json({ token });
};

const getUsersController = async (_req, res) => {
  const allUsers = await service.getUsersService();
  return res.status(200).json(allUsers);
};

const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  const user = await service.getUSerByIdService(id);
  if (user.message) return res.status(404).json(user);
  return res.status(200).json(user);
};

const deleteUserByIdControler = async (_req, res) => {
  const { id } = res.user.locals;

  const result = await service.deleteUserByIdService(id);

  return res.status(result.status).end();
};

module.exports = {
  validateUserController,
  validateNewUserController,
  getUsersController,
  getUserByIdController,
  deleteUserByIdControler,
};