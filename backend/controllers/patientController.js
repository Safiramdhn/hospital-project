const patientService = require('../services/patientService');
const logger = require('../utils/logger');

// Get a list of patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await patientService.getAllPatientService();

    logger.info('Successfully retrieved all patients');
    res.status(200).json(patients);
  } catch (error) {
    logger.error(`Error retrieving patients: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// get a patient by id
const getPatientById = async (req, res) => {
  const id = req.params.id;

  // Check if ID is provided
  if (!id) {
    return res.status(400).json({ message: 'Patient ID is required' });
  }

  // Ensure ID is an integer
  const patientId = parseInt(id);

  try {
    // Fetch patient record by ID
    const patient = await patientService.getPatientByIdService(patientId);

    // If patient record not found, return 404
    if (!patient) {
      logger.error('Patient not found');
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Return patient record
    res.status(200).json(patient);
  } catch (error) {
    // Handle server errors
    logger.error(`Error retrieving patient with ID ${patientId}: ${error.message}`);
    res.status(500).json({ message: 'Internal server error'});
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
    logger.error(`Error retrieving patient with the credential: ${error.message}`); // Fix: access error.message
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


//   create new patient
const createPatient = async (req, res) => {
  console.log('createPatient, req.body:', req.body);
  let { patient, personal_information, social_data, emergency_contact } = req.body;

  try {
    // Ensure req.user is set by the auth middleware
    if (!req.user || !req.user.id) {
      logger.error('User authentication required');
      throw new Error('Employee ID is missing in the request.');
    }
    console.log('User authentication, user: ' + req.user.id);

    patient.employee_id = req.user.id; // Set the employee_id from the token

    const createdPatient = await patientService.createPatientService(patient, personal_information, social_data, emergency_contact);

    logger.info('Patient successfully created with ID', createdPatient.id);
    res.status(201).json({ message: 'Patient successfully created' });
  } catch (error) {
    logger.error(`Error creating patient: ${error.message}`);
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
    if (!req.user || !req.user.id) {
      logger.error('User authentication required');
      throw new Error('Employee ID is missing in the request.');
    }

    patient.employee_id = req.user.id; // Set the employee_id from the token
    console.log(patient.employee_id);
    const updatedPatient = await patientService.updatePatientService(patientId, patient, personalInfo, socialData, emergencyContact);
    if (!updatedPatient) {
      logger.error('Patient not found');
      return res.status(404).json({ message: 'Patient not found' });
    }
    logger.info('Patient successfully updated with ID', patientId);
    res.status(200).json({ message: 'Patient successfully updated' });
  } catch (error) {
    logger.error(`Error updating patient: ${error.message}`);
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
    const deletedPatient = await patientService.deletePatientService(patientId);
    if (!deletedPatient) {
      logger.error('Patient not found');
      return res.status(404).json({ message: 'Patient not found' });
    }
    logger.info('Patient successfully deleted with ID', patientId);
    res.status(200).json({ message: 'Patient successfully deleted' });
  } catch (error) {
    logger.error(`Error deleting patient: ${error.message}`);
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
