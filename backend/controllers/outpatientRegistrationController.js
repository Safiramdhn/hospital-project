const { OutPatientRegistration, BillingDetail, ServiceDetail, VisitDetail } = require('../models/outpatientRegistration');
const logger = require('../utils/logger');

// create new outpatient registration
const createOutPatientRegistration = async (req, res) => {
  let { register, service_detail, billing_detail, visit_detail } = req.body;
  const transaction = await OutPatientRegistration.sequelize.transaction();
  try {
    if (!register) {
      logger.error('OutPatientRegistration requires a registration object');
      return res.status(400).json({ message: 'Missing outpatient registration data' });
    }

    // Validate input
    if (!service_detail.clinic_code || !service_detail.doctor_code) {
      logger.error('Service details must include clinic_code and doctor_code');
      return res.status(400).json({ message: 'Invalid service details' });
    }

    const outpatientRegistration = await OutPatientRegistration.create(register, { transaction });

    service_detail.registration_id = outpatientRegistration.id;
    await ServiceDetail.create(service_detail, { transaction });

    visit_detail.registration_id = outpatientRegistration.id;
    await VisitDetail.create(visit_detail, { transaction });

    billing_detail.registration_id = outpatientRegistration.id;
    await BillingDetail.create(billing_detail, { transaction });

    await transaction.commit();
    logger.info(`Outpatient registration created with ID: ${outpatientRegistration.id}`);
    res.status(201).json({ message: 'Outpatient registration successfully created' });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    logger.error(`Error creating outpatient registration: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOutPatientRegistration };
