const tariffReferenceService = require('../services/tarfiffReferenceService');

// get a list of tariffReferences

const getAllTariffReferences = async (req, res) => {
  try {
    const tariffReferences = await tariffReferenceService.getTariffReferences();

    res.status(200).json(tariffReferences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getAllTariffReferences
}