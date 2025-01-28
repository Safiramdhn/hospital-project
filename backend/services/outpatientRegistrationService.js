const outpatientRegistrationRepo = require('../repositories/outpatientRegisterRepository');

const createOutPatientRegistration = async (register, service_detail, billing_detail, visit_detail) => {
  try {
    if (!register) {
      throw new Error('Missing outpatient registration data');
    }

    // Validate input
    if (!service_detail || !service_detail.clinic_code || !service_detail.doctor_code) {
      throw new Error('Service details must include clinic_code and doctor_code');
    }

    const result = await outpatientRegistrationRepo.create(register, service_detail, billing_detail, visit_detail);
    return result;
  } catch (error) {
    throw new Error('Could not create patient registration data: ' + error.message);
  }
};

const findRegisterByID = async (id) => {
  try {
    if (!id) {
      throw new Error('Invalid patient registration ID');
    }
    const result = await outpatientRegistrationRepo.findByID(id);
    return result;
  } catch (error) {
    throw new Error('Could not find patient registration data: ' + error.message);
  }
};

const findPatientRegistrationByQueueNumber = async (queueNumber) => {
  try {
    if (!queueNumber) {
      throw new Error('Invalid queue number');
    }
    const result = await outpatientRegistrationRepo.findByQueueNumber(queueNumber);
    return result;
  } catch (error) {
    throw new Error('Could not find patient registration data: ' + error.message);
  }
};

module.exports = {
  createOutPatientRegistration,
  findRegisterByID,
  findPatientRegistrationByQueueNumber,
};
