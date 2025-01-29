const { Patient, PatientPersonalInfo, PatientSocialData, PatientEmergencyContact } = require('../models/patients');
const Sequelize = require('sequelize');
const Employee = require('../models/users/employeeModel');

const getAll = async () => {
  try {
    const patients = await Patient.findAll();
    return patients;
  } catch (error) {
    throw error(`Couldn't find any patients, ${error.message}`);
  }
};

const getById = async (id) => {
  try {
    const patient = await Patient.findByPk(id, {
      include: [
        { model: PatientPersonalInfo, as: 'personal_information' },
        { model: PatientSocialData, as: 'social_data' },
        { model: PatientEmergencyContact, as: 'emergency_contact' },
        {
          model: Employee,
          as: 'employee',
          attributes: { exclude: ['password'] },
        },
      ],
    });
    return patient;
  } catch (error) {
    throw error(`Error finding patient with id ${id}, ${error.message}`);
  }
};

const create = async (patient, personalInfo, socialData, emergencyContact) => {
  const transaction = await Patient.sequelize.transaction();

  try {
    const createdPatient = await Patient.create(patient, { transaction });

    await PatientPersonalInfo.create(
      {
        ...personalInfo,
        patient_id: createdPatient.id,
      },
      { transaction }
    );

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
    return createdPatient;
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Error creating new patient, ${error.message}`);
  }
};

const findByCredential = async (patient_credential) => {
  try {
    return await Patient.findOne({
      where: {
        [Sequelize.Op.or]: [{ ktp_number: patient_credential }, { mr_number: patient_credential }],
      },
      include: [
        { model: PatientPersonalInfo, as: 'personal_information' },
        { model: PatientSocialData, as: 'social_data' },
        { model: PatientEmergencyContact, as: 'emergency_contact' },
      ],
    });
  } catch (error) {
    throw new Error(`Error finding patient with credential ${patient_credential}, ${error}`);
  }
};

const update = async (id, patient, personalInfo, socialData, emergencyContact) => {
  const transaction = await Patient.sequelize.transaction();
  try {
    const patientToUpdate = await Patient.findByPk(id, { transaction });
    if (!patientToUpdate) {
      throw new Error(`Patient with id ${id} not found.`);
    }

    await patientToUpdate.update(patient, { transaction });
    await patientToUpdate.update(personalInfo, { transaction });
    await patientToUpdate.update(socialData, { transaction });
    if (emergencyContact && emergencyContact.phone_number !== 0) {
      await patientToUpdate.update(emergencyContact, { transaction });
    }
    await transaction.commit();
    return patientToUpdate;
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    throw error(`Error updating patient with id ${id}, ${error.message}`);
  }
};

const deleteById = async (id) => {
  const transaction = await Patient.sequelize.transaction();
  try {
    const patientToDelete = await Patient.findByPk(id, { transaction });
    if (!patientToDelete) {
      throw new Error(`Patient with id ${id} not found.`);
    }

    // Soft delete patient
    await Patient.destroy({ where: { id }, transaction });

    // Soft delete related personalInfo
    const personalInfo = await PatientPersonalInfo.findOne({ where: { patient_id: id }, transaction });
    if (personalInfo) {
      personalInfo.deletedAt = new Date();
      await personalInfo.save({ transaction });
    }

    // Soft delete related socialData
    const socialData = await PatientSocialData.findOne({ where: { patient_id: id }, transaction });
    if (socialData) {
      socialData.deletedAt = new Date();
      await socialData.save({ transaction });
    }

    // Soft delete related emergencyContact
    const emergencyContact = await PatientEmergencyContact.findOne({ where: { patient_id: id }, transaction });
    if (emergencyContact) {
      emergencyContact.deletedAt = new Date();
      await emergencyContact.save({ transaction });
    }

    await transaction.commit();
    return patientToDelete;
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    throw new Error(`Error deleting patient with id ${id}, ${error.message}`);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  findByCredential,
  update,
  deleteById,
};
