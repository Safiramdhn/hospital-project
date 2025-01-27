const patientService = require('../services/patientService');
const logger = require('../utils/logger');

// Get a list of patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await patientService.getAllPatients();

    logger.info('Successfully retrieved all patients');
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a patient by id
const getPatientById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: 'Patient ID is required' });
  }
  // change id to integer value
  const patientId = parseInt(id);
  try {
    const patient = await patientService.getPatientByIdService(patientId);
    if (!patient) {
      logger.error('Patient not found');
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    logger.error('Error retrieving patient:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// find by patient credentials
const findPatientByCredentials = async (req, res) => {
  const { patient_credential } = req.body;
  try {
    const patient = await patientService.getPatientByCredentialService(patient_credential);

    if (!patient) {
      logger.error('Patient not found');
      return res.status(404).json({ message: 'Patient not found.' });
    }

    logger.info('Successfully retrieved patient by credentials');
    return res.status(200).json({ patient });
  } catch (error) {
    logger.error('Error retrieving patient:', error.message);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//   create new patient
const createPatient = async (req, res) => {
  let { patient, personalInfo, socialData, emergencyContact } = req.body;

  try {
    // Ensure req.user is set by the auth middleware
    if (!req.user || !req.user.id) {
      logger.error('User authentication required');
      throw new Error('Employee ID is missing in the request.');
    }

    patient.employee_id = req.user.id; // Set the employee_id from the token

    const createdPatient = await patientService.createPatientService(patient, personalInfo, socialData, emergencyContact);

    logger.info('Patient successfully created with ID', createdPatient.id);
    res.status(201).json({ message: 'Patient successfully created' });
  } catch (error) {
    await transaction.rollback();
    logger.error('Error creating patient:', error.message);
    res.status(500).json({ message: error.message });
  }
};

//   update patient
const updatePatient = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: 'Patient ID is required' });
  }

  let { patient, personalInfo, socialData, emergencyContact } = req.body;
  try {
    const patientId = parseInt(id);
    const updatedPatient = await patientService.updatePatientService(patientId, patient, personalInfo, socialData, emergencyContact);
    if (!updatedPatient) {
      logger.error('Patient not found');
      return res.status(404).json({ message: 'Patient not found' });
    }
    logger.info('Patient successfully updated with ID', patientId);
    res.status(200).json({ message: 'Patient successfully updated' });
  } catch (error) {
    logger.error('Error updating patient:', error.message);
    res.status(500).json({ message: error.message });
  }
};

//   delete patient
const deletePatient = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: 'Patient ID is required' });
    return res.status(400).json({ message: 'Invalid patient ID' });
  }
  try {
    const patientId = parseInt(id);
    const deletedPatient = await patientService.deletePatient(patientId);
    if (!deletedPatient) {
      logger.error('Patient not found');
      return res.status(404).json({ message: 'Patient not found' });
    }
    logger.info('Patient successfully deleted with ID', patientId);
    res.status(200).json({ message: 'Patient successfully deleted' });
  } catch (error) {
    logger.error('Error deleting patient:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  findPatientByCredentials,
  createPatient,
  updatePatient,
  deletePatient,
};
