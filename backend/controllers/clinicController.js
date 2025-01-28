const clinicService = require('../services/clinicService');

// get a list of clinics

const getAllClinics = async (req, res) => {
  try {
    const clinics = await clinicService.getClinics();

    res.status(200).json(clinics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getAllClinics
}