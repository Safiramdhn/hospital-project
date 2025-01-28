const { Model, DataTypes } = require('sequelize');
const db = require('../../config/database');
const OutPatientRegistration = require('./outpatientRegistrationModel');
const TariffReference = require('./tariffReferenceModel');


class VisitDetail extends Model {}

VisitDetail.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    registration_id: { type: DataTypes.INTEGER, references: { model: 'outpatient_registrations', field: 'id' }, onDelete: 'CASCADE' },
    instalation_type: { type: DataTypes.STRING, defaultValue: 'Rawat Jalan' },
    class_type: { type: DataTypes.ENUM('NON', 'VIP'), defaultValue: 'NON' },
    insurance_type: { type: DataTypes.ENUM('UMUM', 'BPJS Kesehatan', 'BPJS TK'), defaultValue: 'UMUM' },
    insurance_number: { type: DataTypes.STRING, allowNull: false },
    guarantor: { type: DataTypes.STRING, allowNull: true },
    company: { type: DataTypes.STRING, allowNull: true },
    entry_method: { type: DataTypes.ENUM('Datang Sendiri', 'Online') },
    tariff_code: { type: DataTypes.STRING, references: { model: 'tariff_references', key: 'tariff_code' }, defaultValues: 'RH' },
  },
  {
    sequelize: db,
    tableName: 'visit_details',
    modelName: 'VisitDetail',
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
VisitDetail.belongsTo(OutPatientRegistration, { foreignKey: 'registration_id', as: 'outpatient_registration' });
OutPatientRegistration.hasOne(VisitDetail, { foreignKey: 'registration_id', as: 'visit_detail' });

VisitDetail.belongsTo(TariffReference, { foreignKey: 'tariff_code', targetKey: 'tariff_code', as: 'tariff_reference' });
TariffReference.hasMany(VisitDetail, { foreignKey: 'tariff_code', sourceKey: 'tariff_code', as: 'visit_details' });

module.exports = VisitDetail;
