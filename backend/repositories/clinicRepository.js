const { Clinic } = require('../models/outpatientRegistration');

const getAll = async () => {
  try {
    const clinics = await Clinic.findAll();
    return clinics;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAll };
