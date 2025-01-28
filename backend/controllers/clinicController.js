const clinicService = require('../services/clinicService');
const logger = require('../utils/logger');

// get a list of clinics

const getAllClinics = async (req, res) => {
  try {
    const clinics = await clinicService.getClinics();

    logger.info('Successfully retrieved all clinics');
    res.status(200).json(clinics);
  } catch (error) {
    logger.error(`Error retrieving all clinics: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getAllClinics
}