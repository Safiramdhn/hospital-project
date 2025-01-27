const User = require('../models/users/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'jwt_secret';

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await User.Employee.findOne({ where: { email } });

    if (!employee) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!employee.password) {
      return res.status(401).json({ message: 'Invalid password, please try again' });
    }
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password, please try again' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: employee.id, email: employee.email },
      process.env.JWT_SECRET || JWT_SECRET,
      { expiresIn: '1h' } // Token expiration time
    );
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

module.exports = { login };
