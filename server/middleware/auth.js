const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/auth');

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Accès refusé' });
  }
  try {
    const token = header.split(' ')[1];
    req.admin = jwt.verify(token, jwtSecret);
    next();
  } catch {
    res.status(401).json({ message: 'Token invalide' });
  }
};
