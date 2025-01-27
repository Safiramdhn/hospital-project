const { Model, DataTypes } = require('sequelize');
const db = require('../../config/database');


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

module.exports = ServiceDetail;