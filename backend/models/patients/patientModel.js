const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class Patient extends Model {}

Patient.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    mr_number: { type: DataTypes.STRING, allowNull: false},
    ktp_number: { type: DataTypes.STRING, allowNull: false },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    active_status: { type: DataTypes.BOOLEAN, default: true },
    mother_name: { type: DataTypes.STRING },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees', // reference to employee table
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Patient',
    timestamps: true,
    underscored: true,
    paranoid: true,
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

module.exports = Patient;
