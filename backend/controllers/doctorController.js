const doctorService = require('../services/doctorService');
const logger = require('../utils/logger');

// get a list of doctors

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorService.getDoctors();

    logger.info('Successfully retrieved all doctors');
    res.status(200).json(doctors);
  } catch (error) {
    logger.error('Error retrieving all doctors:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getAllDoctors
}