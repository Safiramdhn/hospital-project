const employeeService = require('../services/employeeService');

const getEmployeeProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      logger.error('User authentication required');
      throw new Error('Employee ID is missing in the request.');
    }

    const employee = await employeeService.getEmployeeProfile(req.user.id);
    if (!employee) {
      logger.error(`Couldn't find employee with ID ${req.user.id}`);
      throw new Error(`Couldn't find employee with ID ${req.user.id}`);
    }
  } catch (err) {
    logger.error('Couldn\'t find employee', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getEmployeeProfile };