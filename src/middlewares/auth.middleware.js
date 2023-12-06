const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const [, token] = authorization.split(' ');

  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    res.locals.user = {
      id: verifyToken.sub,
      role: verifyToken.role,
    };
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};