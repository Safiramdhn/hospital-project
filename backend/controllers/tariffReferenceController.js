const tariffReferenceService = require('../services/tarfiffReferenceService');
const logger = require('../utils/logger');

// get a list of tariffReferences

const getAllTariffReferences = async (req, res) => {
  try {
    const tariffReferences = await tariffReferenceService.getTariffReferences();

    logger.info('Successfully retrieved all tariff references');
    res.status(200).json(tariffReferences);
  } catch (error) {
    logger.error(`Error retrieving tariff references: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getAllTariffReferences
}