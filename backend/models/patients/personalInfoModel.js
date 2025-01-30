const { Model, DataTypes } = require('sequelize');
const db = require('../../config/database');
const Patient = require('./patientModel');

class PatientPersonalInfo extends Model {}

PatientPersonalInfo.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    patient_id: { type: DataTypes.INTEGER, references: { model: 'patients', key: 'id' }, onDelete: 'CASCADE' },
    birth_place: { type: DataTypes.STRING, allowNull: false },
    birth_date: { type: DataTypes.DATEONLY, allowNull: false },
    gender: { type: DataTypes.ENUM('Perempuan', 'Laki-laki', 'Lain-lain'), allowNull: false },
    blood_type: { type: DataTypes.ENUM('A', 'B', 'O', 'AB'), allowNull: false },
    maritial_status: { type: DataTypes.ENUM('Menikah', 'Single', 'Duda/Janda'), allowNull: false },
    religion: { type: DataTypes.ENUM('Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha', 'Lain-lain') },
    contact_number: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    id_type: { type: DataTypes.ENUM('KTP', 'Passport'), allowNull: false },
    id_number: { type: DataTypes.STRING, allowNull: false },
    employeer: { type: DataTypes.STRING, allowNull: true },
    education: { type: DataTypes.ENUM('SD', 'SMP', 'SMA/K', 'D3', 'D4/S1', 'S2', 'Lain-lain'), allowNull: false },
  },
  {
    sequelize: db,
    tableName: 'patient_personal_infomations',
    modelName: 'PatientPersonalInfo',
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

PatientPersonalInfo.belongsTo(Patient, { foreignKey: 'patient_id', as: 'patient' });
Patient.hasOne(PatientPersonalInfo, { foreignKey: 'patient_id', as: 'personal_information' });

PatientPersonalInfo.sync();

module.exports = PatientPersonalInfo;
