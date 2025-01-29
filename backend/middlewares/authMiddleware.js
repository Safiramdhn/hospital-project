const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const authMiddleware = (req, res, next) => {
  const auth = req.header('Authorization');
  if (!auth) {
    logger.info(`No Authorization header found in request: ${req.originalUrl}`);
    return res.status(403).json({ message: 'No authorization header' });
  }

  const token = auth.split(' ')[1]; // Bearer token
  if (!token) {
    logger.info(`No token found in request: ${req.originalUrl}`);
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    logger.info(`accessed ${req.originalUrl}`);
    next();
  } catch (error) {
    logger.error(`Invalid token for request: ${req.originalUrl}`);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
