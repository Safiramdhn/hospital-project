const { OutPatientRegistration, BillingDetail, ServiceDetail, VisitDetail } = require('../models/outpatientRegistration');

// create new outpatient registration
const createOutPatientRegistration = async (req, res) => {
    let { register, service_detail, billing_detail, visit_detail } = req.body;
    const transaction = await OutPatientRegistration.sequelize.transaction();
    try {
        if (!register) {
            return res.status(400).json({ message: 'Missing outpatient registration data' });
        }

        // Validate input
        if (!service_detail.clinic_code || !service_detail.doctor_code) {
            return res.status(400).json({ message: 'Invalid service details' });
        }

        console.log('Creating outpatient registration with data:', register);
        const outpatientRegistration = await OutPatientRegistration.create(register, { transaction });
        console.log('Created outpatient registration:', outpatientRegistration);

        service_detail.registration_id = outpatientRegistration.id;
       await ServiceDetail.create(service_detail, { transaction });

        visit_detail.registration_id = outpatientRegistration.id;
        await VisitDetail.create(visit_detail, { transaction });

        billing_detail.registration_id = outpatientRegistration.id;
        await BillingDetail.create(billing_detail, { transaction });

        await transaction.commit();
        res.status(201).json({ message: 'Outpatient registration successfully created'});
    } catch (error) {
        if (!transaction.finished) {
            await transaction.rollback();
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOutPatientRegistration };