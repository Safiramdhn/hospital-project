const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const auth = req.header('Authorization');
  if (!auth) return res.status(403).json({ message: 'No authorization header' });

  const token = auth.split(' ')[1]; // Bearer token
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
