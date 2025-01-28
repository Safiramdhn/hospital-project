const { Model, DataTypes } = require('sequelize');
const db = require('../../config/database');
const OutPatientRegistration = require('./outpatientRegistrationModel');
const Clinic = require('./clinicModel');
const Doctor = require('../users/doctorModel');

class ServiceDetail extends Model {}

ServiceDetail.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    registration_id: { type: DataTypes.INTEGER, references: { model: 'outpatient_registrations', field: 'id' } },
    clinic_code: { type: DataTypes.STRING, references: { model: 'clinics', key: 'code' } },
    doctor_code: { type: DataTypes.STRING, references: { model: 'doctors', key: 'code' } },
  },
  {
    sequelize: db,
    tableName: 'service_details',
    modelName: 'ServiceDetail',
    timestamps: true,
    underscored: true,
    paranoid: true, // enable soft deletes
    defaultScope: {
      attributes: { exclude: ['deleted_at'] },
    },
    scopes: {
      includeDeleted: {
        attributes: [],
      },
    },
  }
);

// Define associations
ServiceDetail.belongsTo(OutPatientRegistration, { foreignKey: 'registration_id', as: 'outpatient_registration' });
OutPatientRegistration.hasOne(ServiceDetail, { foreignKey: 'registration_id', as: 'service_detail' });

ServiceDetail.belongsTo(Clinic, { foreignKey: 'clinic_code', targetKey: 'code', as: 'clinic' });
Clinic.hasMany(ServiceDetail, { foreignKey: 'clinic_code', sourceKey: 'code', as: 'service_details' });

ServiceDetail.belongsTo(Doctor, { foreignKey: 'doctor_code', targetKey: 'code', as: 'doctor' });
Doctor.hasMany(ServiceDetail, { foreignKey: 'doctor_code', sourceKey: 'code', as: 'service_details' });

module.exports = ServiceDetail;