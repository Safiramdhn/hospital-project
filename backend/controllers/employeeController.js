const employeeService = require('../services/employeeService');
const logger = require('../utils/logger');

const getEmployeeProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      logger.error('User authentication required');
      throw new Error('Employee ID is missing in the request.');
    }

    const employee = await employeeService.getEmployee(req.user.id);
    if (!employee) {
      logger.error(`Couldn't find employee with ID ${req.user.id}`);
      throw new Error(`Couldn't find employee with ID ${req.user.id}`);
    }

    logger.info(`Found employee with ID ${req.user.id}`);
    res.status(200).json(employee);
  } catch (error) {
    logger.error(`Couldn\'t find employee ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getEmployeeProfile };