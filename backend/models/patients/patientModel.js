const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Employee = require('../users/employeeModel');

class Patient extends Model {}

Patient.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    mr_number: { type: DataTypes.STRING, allowNull: false },
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

Patient.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee' });
Employee.hasMany(Patient, { foreignKey: 'employee_id' });

// sync table with database, if not exists, create it. This will automatically create indexes and foreign keys. 1:M relationship between Patient and Employee.
Patient.sync();

module.exports = Patient;
