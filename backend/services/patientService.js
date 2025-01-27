const patientRepo = require('../repositories/patientRepository');
const moment = require('moment');
const crypto = require('crypto');

const getAllPatientService = async () => {
  return await patientRepo.getAll();
};

const getPatientByIdService = async (patientId) => {
  return await patientRepo.findById(patientId);
};

const getPatientByCredentialService = async (patient_credential) => {
  if (!patient_credential || patient_credential === '') {
    throw new Error('Invalid patient credential value');
  }
  return await patientRepo.findByCredential(patient_credential);
};

const createPatientService = async (patient, personalInfo, socialData, emergencyContact) => {
  const hashedKtp = crypto.createHash('sha256').update(patient.ktp_number).digest('hex');
  patient.mr_number = `${moment().format('YYYYMMDD')}-${patient.employee_id}-${hashedKtp.substring(0, 8)}`;

  personalInfo.id_number = patient.ktp_number;

  socialData.mr_date = moment().format('YYYY-MM-DD');
  return await patientRepo.create(patient, personalInfo, socialData, emergencyContact);
};

const updatePatientService = async (patientId, patient, personalInfo, socialData, emergencyContact) => {
  return await patientRepo.update(patientId, patient, personalInfo, socialData, emergencyContact);
};

const deletePatientService = async (patientId) => {
  return await patientRepo.delete(patientId);
};

module.exports = {
  getAllPatientService,
  getPatientByIdService,
  getPatientByCredentialService,
  createPatientService,
  updatePatientService,
  deletePatientService,
};
