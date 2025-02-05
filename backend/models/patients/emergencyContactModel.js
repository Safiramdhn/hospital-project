const { Model, DataTypes } = require('sequelize');
const db = require('../../config/database');
const Patient = require('./patientModel');

class PatientEmergencyContact extends Model {}

PatientEmergencyContact.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    patient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Patients',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    contact_name: { type: DataTypes.STRING, allowNul: false },
    phone_number: { type: DataTypes.STRING, allowNul: false },
    address: { type: DataTypes.STRING, allowNul: false },
    city: { type: DataTypes.STRING, allowNul: false },
  },
  {
    sequelize: db,
    modelName: 'PatientEmergencyContact',
    tableName: 'patient_emergency_contacts',
    timestamps: true,
    underscored: true,
    paranoid: true, //enable soft deletes
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

PatientEmergencyContact.belongsTo(Patient, { foreignKey: 'patient_id', as: 'patient' });
Patient.hasOne(PatientEmergencyContact, { foreignKey: 'patient_id', as: 'emergency_contact' });

PatientEmergencyContact.sync();

module.exports = PatientEmergencyContact;
