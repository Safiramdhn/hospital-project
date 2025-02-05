const { OutPatientRegistration, BillingDetail, ServiceDetail, VisitDetail, Clinic } = require('../models/outpatientRegistration');
const { Patient } = require('../models/patients');
const { Doctor} = require('../models/users');

const create = async (register, service_detail, billing_detail, visit_detail) => {
  const transaction = await OutPatientRegistration.sequelize.transaction();

  try {
    const outpatientRegistration = await OutPatientRegistration.create(register, { transaction });

    service_detail.registration_id = outpatientRegistration.id;
    await ServiceDetail.create(service_detail, { transaction });

    visit_detail.registration_id = outpatientRegistration.id;
    await VisitDetail.create(visit_detail, { transaction });

    billing_detail.registration_id = outpatientRegistration.id;
    await BillingDetail.create(billing_detail, { transaction });

    await transaction.commit();
    return outpatientRegistration;
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    throw new Error('Failed to commit transaction: ' + error.message);
  }
};

const findByID = async (id) => {
  return await OutPatientRegistration.findByPk(id, {
    include: [
      { model: ServiceDetail, as: 'service_detail' },
      { model: VisitDetail, as: 'visit_detail' },
      { model: BillingDetail, as: 'billing_detail' },
    ],
  });
};

const findByQueueNumber = async (queueNumber) => {
  return await OutPatientRegistration.findOne({
    where: { queue_number: queueNumber },
    include: [
      { model: ServiceDetail, as: 'service_detail' },
      { model: VisitDetail, as: 'visit_detail' },
      { model: BillingDetail, as: 'billing_detail' },
    ],
  });
};

const findAll = async (filter) => {
  return await OutPatientRegistration.findAll({
    where: filter,
    include: [
      { model: ServiceDetail, as: 'service_detail', include: [
        { model: Clinic, as: 'clinic' },
        { model: Doctor, as: 'doctor' },
      ] },
      { model: VisitDetail, as: 'visit_detail' },
      { model: BillingDetail, as: 'billing_detail' },
      { model: Patient, as: 'patient' },
    ],
    order: [['visit_date', 'DESC']],
  });
};


module.exports = {
  create,
  findByID,
  findByQueueNumber,
  findAll,
};
