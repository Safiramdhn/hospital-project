const doctorService = require('../services/doctorService');

// get a list of doctors

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorService.getDoctors();

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getAllDoctors
}