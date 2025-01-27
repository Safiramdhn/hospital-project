const { Patient, PatientPersonalInfo, PatientSocialData, PatientEmergencyContact } = require('../models/patients');
const moment = require('moment');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const logger = require('../utils/logger');

// Get a list of patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();

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
    res.status(400).json({ message: 'Patient ID is required' });
    return res.status(400).json({ message: 'Invalid patient ID' });
  }
  // change id to integer value
  const patientId = parseInt(id);
  try {
    const patient = await Patient.findByPk(patientId);
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
  try {
    const { patient_credential } = req.body;

    // Validate input
    if (!patient_credential || patient_credential === '') {
      logger.error('Invalid patient_credential value');
      return res.status(400).json({ message: 'patient_credential is required and must be a valid number.' });
    }

    // Query the database using Sequelize OR condition
    const patient = await Patient.findOne({
      where: {
        [Sequelize.Op.or]: [{ ktp_number: patient_credential }, { mr_number: patient_credential }],
      },
    });

    if (!patient) {
      logger.error('Patient not found');
      return res.status(404).json({ message: 'Patient not found.' });
    }

    logger.info('Successfully retrieved patient by credentials');
    return res.status(200).json({ patient });
  } catch (error) {
    logger.error('Error creating patient:', error.message);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//   create new patient
const createPatient = async (req, res) => {
  const transaction = await Patient.sequelize.transaction();
  let { patient, personalInfo, socialData, emergencyContact } = req.body;

  try {
    // Ensure req.user is set by the auth middleware
    if (!req.user || !req.user.id) {
      logger.error('User authentication required');
      throw new Error('Employee ID is missing in the request.');
    }

    patient.employee_id = req.user.id; // Set the employee_id from the token

    const hashedKtp = crypto.createHash('sha256').update(patient.ktp_number).digest('hex');
    patient.mr_number = `${moment().format('YYYYMMDD')}-${patient.employee_id}-${hashedKtp.substring(0, 8)}`;

    // Create the patient record
    const createdPatient = await Patient.create(patient, { transaction });

    personalInfo.id_number = patient.ktp_number;
    await PatientPersonalInfo.create(
      {
        ...personalInfo,
        patient_id: createdPatient.id,
      },
      { transaction }
    );

    socialData.mr_date = moment().format('YYYY-MM-DD');
    await PatientSocialData.create(
      {
        ...socialData,
        patient_id: createdPatient.id,
      },
      { transaction }
    );

    if (emergencyContact && emergencyContact.phone_number !== 0) {
      await PatientEmergencyContact.create(
        {
          ...emergencyContact,
          patient_id: createdPatient.id,
        },
        { transaction }
      );
    }

    await transaction.commit();
    logger.info('Patient successfully created with ID', patient.id);
    res.status(201).json({ message: 'Patient successfully created' });
  } catch (error) {
    await transaction.rollback();
    logger.error('Error creating patient:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  findPatientByCredentials,
  createPatient,
};
