const outpatientRegistrationService = require('../services/outpatientRegistrationService');
const logger = require('../utils/logger');

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

module.exports = {
  createOutPatientRegistration,
  getOutPatientRegistration,
};
