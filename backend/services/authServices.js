const authRepo = require('../repositories/authRepository');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');

const loginService = async (email, password) => {
    if (email === undefined || email === '') {
        throw new Error('Email is required');
    }

    const employee = await authRepo.findByEmail(email);
    if (!employee) {
      logger.error(`Couldn't find employee ${email}`);
      throw new Error(`Couldn't find employee ${email}`)
    }

    if (!employee.password) {
      logger.error(`Employee ${email} has no password`);
      throw new Error(`Employee ${email} has no password`);
    }

    // Compare entered password with hashed password from the database
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      logger.error(`Employee ${email} entered incorrect password`);
      throw new Error(`Invalid password for employee ${email}`);
    }

    return employee;
}

module.exports = {
  loginService,
};