const outpatientRegistrationService = require('../services/outpatientRegistrationService');
const logger = require('../utils/logger');

const { Op } = require('sequelize');

// create new outpatient registration
const createOutPatientRegistration = async (req, res) => {
  let { register, service_detail, billing_detail, visit_detail } = req.body;
  try {
    const outpatientRegistration = await outpatientRegistrationService.createOutPatientRegistration(
      register,
      service_detail,
      billing_detail,
      visit_detail
    );

    if (outpatientRegistration && outpatientRegistration.id > 0) {
      logger.info(`Outpatient registration created with ID: ${outpatientRegistration.id}`);
      res.status(201).json({ message: 'Outpatient registration successfully created', queue_number: outpatientRegistration.queue_number});
    } else {
      logger.warn('Outpatient registration created but no ID returned');
      res.status(500).json({ message: 'Outpatient registration created but no ID returned' });
    }
  } catch (error) {
    logger.error(`Error creating outpatient registration: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// get outpatient registration by id
const getOutPatientRegistration = async (req, res) => {
  const id = parseInt(req.query.id);
  const queueNumber = parseInt(req.query.queue_number);

  try {
    let outpatientRegistration;
    if (id && !queueNumber) {
      outpatientRegistration = await outpatientRegistrationService.findRegisterByID(id);
    } else if (!id && queueNumber) {
      outpatientRegistration = await outpatientRegistrationService.findPatientRegistrationByQueueNumber(queueNumber);
    } else {
      throw new Error('Either ID or queue number must be provided');
    }

    if (outpatientRegistration) {
      logger.info(`Successfully retrieved outpatient registration with ID ${id}`);
      res.status(200).json(outpatientRegistration);
    } else {
      const param = id ? `ID ${id}` : `Queue number ${queueNumber}`
      logger.info(`Outpatient registration with ${param} not found`);
      res.status(404).json({ message: `Outpatient registration with ${param} not found` });
    }
  } catch (error) {
    logger.error(`Error getting outpatient registration by ID: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// get all registered outpatients with filter
const getAllOutPatientRegistration = async (req, res) => {
  let { patient_name, doctor_name, clinic_name, registration_number, booking_number } = req.query;

  let filter = {};

  if (patient_name) {
    filter['$patient.first_name$'] = { [Op.like]: `%${patient_name}%` };
  }
  if (doctor_name) {
    filter['$service_detail.doctor.name$'] = { [Op.like]: `%${doctor_name}%` };
  }
  
  if (clinic_name) {
    filter['$service_detail.clinic.name$'] = { [Op.like]: `%${clinic_name}%` };
  }
  if (registration_number) {
    filter['$registration_number$'] = { [Op.like]: `%${registration_number}%` };
  }
  if (booking_number) {
    filter['$booking_number$'] = { [Op.like]: `%${booking_number}%` };
  }

  try {
    const outpatientRegistrations = await outpatientRegistrationService.getOutpatients(filter);
    logger.info('Successfully retrieved all outpatient registrations');
    res.status(200).json(outpatientRegistrations);
  } catch (error) {
    logger.error(`Error retrieving all outpatient registrations: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOutPatientRegistration,
  getOutPatientRegistration,
  getAllOutPatientRegistration,
};
