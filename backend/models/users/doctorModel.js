const { Model, DataTypes } = require('sequelize');
const db = require('../../config/database');

class Doctor extends Model {}

Doctor.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    clinic_id: { type: DataTypes.INTEGER, references: { model: 'clinics', field: 'id' } },
  },
  {
    sequelize: db,
    modelName: 'Doctor',
    tableName: 'doctors',
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
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

module.exports = Doctor;
