const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const authService = require('../services/authService');

const JWT_SECRET = 'jwt_secret';

const login = async (req, res) => {
  logger.info(`login ${req.method} ${req.url}`)
  const { email, password } = req.body;

  try {
    const employee = await authService.loginService(email, password);

    // Generate JWT token
    const token = jwt.sign(
      { id: employee.id, email: employee.email },
      process.env.JWT_SECRET || JWT_SECRET,
      { expiresIn: '1h' } // Token expiration time
    );

    logger.info(`Logged in employee ${email}`);
    res.status(200).json({ token });
  } catch (err) {
    logger.error(`Error during login: ${err.message}`);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

module.exports = { login };
