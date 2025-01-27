const User = require('../models/users/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const JWT_SECRET = 'jwt_secret';

const login = async (req, res) => {
  logger.info(`login ${req.method} ${req.url}`)
  const { email, password } = req.body;

  try {
    const employee = await User.Employee.findOne({ where: { email } });

    if (!employee) {
      logger.error(`Couldn't find employee ${email}`);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!employee.password) {
      logger.error(`Employee ${email} has no password`);
      return res.status(401).json({ message: 'Invalid password, please try again' });
    }

    // Compare entered password with hashed password from the database
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      logger.error(`Employee ${email} entered incorrect password`);
      return res.status(401).json({ message: 'Invalid password, please try again' });
    }

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
